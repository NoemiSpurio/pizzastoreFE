import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { Pizza } from 'src/app/model/pizza';
import { User } from 'src/app/model/user';
import { ClienteService } from '../../cliente/cliente.service';
import { PizzaService } from '../../pizza/pizza.service';
import { OrdineService } from '../ordine.service';

export interface OrdineForm extends FormGroup<{
  id: FormControl<any>;
  data: FormControl<any>;
  codice: FormControl<string>;
  costo: FormControl<any>;
  closed: FormControl<any>;
  cliente: FormControl<any>;
  fattorino: FormControl<any>;
  pizze: FormControl<any>
}> { }

@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css']
})
export class DetailOrdineComponent {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ordineService: OrdineService, 
    private router: Router, private clienteService: ClienteService, private pizzaService: PizzaService){}

  idOrdine?: number = 0;
  ordine: Ordine = {};
  clienti: Cliente[] = [];
  fattorini: User[] = [];
  pizze: Pizza[] = [];

  ordineReactive: FormGroup = this.fb.group({
    id: this.fb.control(null),
    data: this.fb.nonNullable.control('', [Validators.required]),
    codice: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    costo: this.fb.nonNullable.control(''),
    closed: this.fb.nonNullable.control(''),
    cliente: this.fb.nonNullable.control('', [Validators.required]),
    fattorino: this.fb.nonNullable.control('', [Validators.required]),
    pizze: this.fb.nonNullable.array([], [Validators.required])
  });

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      let id = this.route.snapshot.paramMap.get('id');
      this.idOrdine = parseInt(id!);
      this.ordineService.findById(this.idOrdine).subscribe(u => {
        this.ordineReactive.patchValue(u);
      });
      if(this.router.url.includes('detail'))
        this.ordineReactive.disable();
    }
    this.clienteService.getAllClienti().subscribe(res => {
      this.clienti = res;
    });

    this.ordineService.getAllFattorini().subscribe(res => {
      this.fattorini = res;
    });

    this.pizzaService.getAllPizze().subscribe(res => {
      this.pizze = res;
    });
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.idOrdine)
      this.ordineService.findById(this.idOrdine).subscribe(u => this.ordine = u);
  }

  save(){
    if(!this.ordineReactive.value.closed)
      this.ordineReactive.value.closed = false;
    if(this.ordineReactive.valid)
      this.ordineService.save(this.ordineReactive.value).subscribe(res => this.router.navigate(['ordine/list']));
  }

  back(){
    this.router.navigate(['ordine/list']);
  }

  disable(): boolean {
    if(this.router.url.includes('detail'))
      return false;
    else
      return true;
  }
}
