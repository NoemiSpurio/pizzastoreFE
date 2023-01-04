import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { OrdineService } from '../ordine.service';

@Component({
  selector: 'app-dialog-delete-ordine',
  templateUrl: './dialog-delete-ordine.component.html',
  styleUrls: ['./dialog-delete-ordine.component.css']
})
export class DialogDeleteOrdineComponent {

  idOrdine?: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private ordineService: OrdineService, private snackService: SnackbarService){
    if(data)
      this.idOrdine = data;
  }

  delete(){
    this.ordineService.delete(this.idOrdine!).subscribe();
    this.snackService.openSnackbar("Ordine eliminato!");
  }
}
