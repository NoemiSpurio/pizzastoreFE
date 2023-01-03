import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-dialog-delete-pizza',
  templateUrl: './dialog-delete-pizza.component.html',
  styleUrls: ['./dialog-delete-pizza.component.css']
})
export class DialogDeletePizzaComponent {

  idPizza?: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private pizzaService: PizzaService, private snackService: SnackbarService){
    if(data)
      this.idPizza = data;
  }

  delete(){
    this.pizzaService.delete(this.idPizza!).subscribe();
    this.snackService.openSnackbar("Pizza eliminata!");
  }
}
