import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizza } from 'src/app/model/pizza';
import { PizzaService } from '../pizza.service';

export interface PizzaForm extends FormGroup<{
  id: FormControl<any>;
  descrizione: FormControl<string>;
  ingredienti: FormControl<string>;
  prezzoBase: FormControl<any>;
  attivo: FormControl<any>;
}> { }

@Component({
  selector: 'app-detail-pizza',
  templateUrl: './detail-pizza.component.html',
  styleUrls: ['./detail-pizza.component.css']
})
export class DetailPizzaComponent {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private pizzaService: PizzaService){}

  idPizza?: number = 0;
  pizza: Pizza = {};

  pizzaReactive: PizzaForm = this.fb.group({
    id: this.fb.control(null),
    descrizione: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    ingredienti: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(4)]),
    prezzoBase: this.fb.nonNullable.control('', [Validators.required]),
    attivo: this.fb.nonNullable.control('')
  });

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != null){
      let id = this.route.snapshot.paramMap.get('id');
      this.idPizza = parseInt(id!);
      this.pizzaService.findById(this.idPizza).subscribe(u => this.pizzaReactive.patchValue(u));
      if(this.router.url.includes('detail'))
        this.pizzaReactive.disable();
    }
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(this.idPizza)
      this.pizzaService.findById(this.idPizza).subscribe(u => this.pizza = u);
  }

  save(){
    if(!this.pizzaReactive.value.attivo)
    this.pizzaReactive.value.attivo = false;
    if(this.pizzaReactive.valid)
      this.pizzaService.save(this.pizzaReactive.value).subscribe(res => this.router.navigate(['pizza/list']));
  }

  back(){
    this.router.navigate(['pizza/list']);
  }

  disable(): boolean {
    if(this.router.url.includes('detail'))
      return false;
    else
      return true;
  }
}
