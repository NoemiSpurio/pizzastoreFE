import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { Pizza } from 'src/app/model/pizza';
import { PizzaChecked } from 'src/app/model/pizza-checked';
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
  cliente: FormControl<Cliente>;
  fattorino: FormControl<User>;
  pizze: FormControl<Pizza[]>
}> { }

@Component({
  selector: 'app-detail-ordine',
  templateUrl: './detail-ordine.component.html',
  styleUrls: ['./detail-ordine.component.css']
})
export class DetailOrdineComponent {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ordineService: OrdineService,
    private router: Router, private clienteService: ClienteService, private pizzaService: PizzaService) { }

  idOrdine?: number = 0;
  ordine: Ordine = {};
  clienti: Cliente[] = [];
  fattorini: User[] = [];
  pizze: PizzaChecked[] = [];

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
    if (this.route.snapshot.paramMap.get('id') != null) {
      let id = this.route.snapshot.paramMap.get('id');
      this.idOrdine = parseInt(id!);
      this.ordineService.findById(this.idOrdine).subscribe(o => {
        this.ordineReactive.patchValue(o);
        this.ordineReactive.value.pizze?.forEach(p => {
          console.log(p.descrizione);
        })
      }); 
    }
    if (this.isDetail()) {
      this.ordineReactive.disable();
    } else {
      this.clienteService.getAllClienti().subscribe(res => {
        this.clienti = res;
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
    if (this.ordineReactive.valid)
      this.ordineService.save(this.ordineReactive.value).subscribe(res => this.router.navigate(['ordine/list']));
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
}
