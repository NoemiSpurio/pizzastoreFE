import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { DataSearchServiceService } from 'src/app/shared/services/data-search-service.service';
import { ClienteService } from '../cliente.service';

export interface ClienteForm extends FormGroup<{
  id: FormControl<any>;
  nome: FormControl<string>;
  cognome: FormControl<string>;
  indirizzo: FormControl<string>;
  attivo: FormControl<any>;
}> { }

@Component({
  selector: 'app-detail-cliente',
  templateUrl: './detail-cliente.component.html',
  styleUrls: ['./detail-cliente.component.css']
})
export class DetailClienteComponent {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private clienteService: ClienteService, private router: Router,
    private dataSearchService: DataSearchServiceService) { }

  idCliente?: number = 0;
  cliente: Cliente = {};

  clienteReactive: ClienteForm = this.fb.group({
    id: this.fb.control(null),
    nome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    cognome: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    indirizzo: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
    attivo: this.fb.nonNullable.control('')
  });

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') != null) {
      let id = this.route.snapshot.paramMap.get('id');
      this.idCliente = parseInt(id!);
      this.clienteService.findById(this.idCliente).subscribe(u => this.clienteReactive.patchValue(u));
      if (this.router.url.includes('detail'))
        this.clienteReactive.disable();
    }

    if (this.router.url.includes('search')) {
      this.clienteReactive.get('nome')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.clienteReactive.get('cognome')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.clienteReactive.get('indirizzo')?.removeValidators([Validators.required, Validators.minLength(4), Validators.maxLength(30)]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idCliente)
      this.clienteService.findById(this.idCliente).subscribe(u => this.cliente = u);
  }

  save() {
    if (!this.router.url.includes('search')) {
      if (!this.clienteReactive.value.attivo)
        this.clienteReactive.value.attivo = false;
      if (this.clienteReactive.valid)
        this.clienteService.save(this.clienteReactive.value).subscribe(res => this.router.navigate(['cliente/list']));
    } else  {
      this.clienteService.search(this.clienteReactive.value).subscribe({
        next: clienteItem => this.dataSearchService.setData(clienteItem),
        complete: () => this.router.navigate(['/cliente/listFromSearch'])
      });
    }
  }

  back() {
    this.router.navigate(['cliente/list']);
  }

  disable(): boolean {
    if (this.router.url.includes('detail'))
      return false;
    else
      return true;
  }

  hide(): boolean {
    if (this.router.url.includes('search'))
      return false;
    else
      return true;
  }
}
