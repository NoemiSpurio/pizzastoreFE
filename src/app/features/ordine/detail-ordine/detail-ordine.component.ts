import { Component, LOCALE_ID, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { FloatLabelType } from '@angular/material/form-field';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { Pizza } from 'src/app/model/pizza';
import { PizzaChecked } from 'src/app/model/pizza-checked';
import { User } from 'src/app/model/user';
import { DataSearchServiceService } from 'src/app/shared/services/data-search-service.service';
import { ClienteService } from '../../cliente/cliente.service';
import { PizzaService } from '../../pizza/pizza.service';
import { OrdineService } from '../ordine.service';

export interface OrdineForm extends FormGroup<{
  id: FormControl<any>;
  data: FormControl<any>;
  codice: FormControl<string>;
  costo: FormControl<any>;
  closed: FormControl<any>;
  cliente: FormControl<Cliente>;
  fattorino: FormControl<User>;
  pizze: FormControl<Pizza[]>
}> { }

@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css'],
  providers: [
    { provide: LOCALE_ID, useValue: 'it-IT' }
  ]
})
export class DetailOrdineComponent {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ordineService: OrdineService,
    private router: Router, private clienteService: ClienteService, private pizzaService: PizzaService,
    private dateAdapter: DateAdapter<any>, private dataSearchService: DataSearchServiceService) { }

  idOrdine?: number = 0;
  ordine: Ordine = {};
  clienti: Cliente[] = [];
  fattorini: User[] = [];
  pizze: PizzaChecked[] = [];
  nomeCliente: string = '';
  nomeFattorino: string = '';

  ordineReactive: OrdineForm = this.fb.group({
    id: this.fb.control(null),
    data: this.fb.nonNullable.control('', [Validators.required]),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    costo: this.fb.nonNullable.control(''),
    closed: this.fb.nonNullable.control(''),
    cliente: this.fb.nonNullable.control({}, [Validators.required]),
    fattorino: this.fb.nonNullable.control({}, [Validators.required]),
    pizze: this.fb.nonNullable.control([{}], [Validators.required])
  });

  ngOnInit(): void {
    this.dateAdapter.setLocale('it-IT');
    if (this.route.snapshot.paramMap.get('id') != null) {
      let id = this.route.snapshot.paramMap.get('id');
      this.idOrdine = parseInt(id!);
      this.ordineService.findById(this.idOrdine).subscribe(o => {
        this.ordineReactive.patchValue(o);
        this.nomeCliente = this.ordineReactive.value.cliente?.nome + ' ' + this.ordineReactive.value.cliente?.cognome;
        this.nomeFattorino = this.ordineReactive.value.fattorino?.nome + ' ' + this.ordineReactive.value.fattorino?.cognome;
      });
    }
    if (this.isDetail()) {
      this.ordineReactive.disable();
    } else {
      this.clienteService.getAllClienti().subscribe(res => {
        res.forEach(c => {
          if (c.attivo) this.clienti.push(c);
        });
      });

      this.ordineService.getAllFattorini().subscribe(res => {
        this.fattorini = res;
      });
    }
    this.pizzaService.getAllPizze().subscribe(res => {
      this.pizze = res;
      this.pizze.forEach(p => {
        p.checked = this.isPizzaChecked(p.descrizione!);
      })
    });

    if (this.router.url.includes('search')) {
      this.ordineReactive.get('data')?.removeValidators([Validators.required]);
      this.ordineReactive.get('codice')?.removeValidators([Validators.required, Validators.minLength(4)]);
      this.ordineReactive.get('cliente')?.removeValidators([Validators.required]);
      this.ordineReactive.get('fattorino')?.removeValidators([Validators.required]);
      this.ordineReactive.get('pizze')?.removeValidators([Validators.required]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idOrdine)
      this.ordineService.findById(this.idOrdine).subscribe(u => {
        this.ordine = u;
      });
  }

  save() {
    if (!this.ordineReactive.value.closed)
      this.ordineReactive.value.closed = false;
    let pizzeNellOrdine: Pizza[] = [];
    this.pizze.forEach(pizza => {
      if (pizza.checked)
        pizzeNellOrdine.push(pizza);
    })
    if (pizzeNellOrdine.length > 0)
      this.ordineReactive.value.pizze! = pizzeNellOrdine;

    if(this.ordineReactive.value.data)
      this.ordineReactive.value.data = this.getIsoDateWithoutTime(new Date(Date.parse(this.ordineReactive.value.data!)));
    if (!this.router.url.includes('search')) {
      if (this.ordineReactive.valid)
        this.ordineService.save(this.ordineReactive.value).subscribe(() => this.router.navigate(['ordine/list']));
    } else {
      this.ordineService.search(this.ordineReactive.value).subscribe({
        next: ordineItem => this.dataSearchService.setData(ordineItem),
        complete: () => this.router.navigate(['/ordine/listFromSearch'])
      });
    }
  }

  back() {
    this.router.navigate(['ordine/list']);
  }

  isCreate(): boolean {
    return this.router.url.includes('create');
  }

  isDetail(): boolean {
    return this.router.url.includes('detail');
  }

  isEdit(): boolean {
    return this.router.url.includes('edit');
  }

  isPizzaChecked(pizzaDescription: string): boolean {
    let output: boolean = false;
    if (!this.isCreate()) {
      this.ordineReactive.value.pizze?.forEach(p => {
        if (pizzaDescription === p.descrizione)
          output = true;
      });
    }
    return output;
  }

  checkPizza(pizza: PizzaChecked): void {
    pizza.checked = !pizza.checked;
  }

  // per ottenere la data in formato yyyy-MM-dd
  getIsoDateWithoutTime(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' + ('0' + date.getDate()).slice(-2);
  }

  isLabelFloating(): FloatLabelType {
    return this.isCreate() ? 'auto' : 'always';
  }
}
