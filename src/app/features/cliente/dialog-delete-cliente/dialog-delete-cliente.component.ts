import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/snackbar/snackbar.service';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-dialog-delete-cliente',
  templateUrl: './dialog-delete-cliente.component.html',
  styleUrls: ['./dialog-delete-cliente.component.css']
})
export class DialogDeleteClienteComponent {

  idCliente?: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: number, private clienteService: ClienteService, private snackService: SnackbarService){
    if(data)
      this.idCliente = data;
  }

  delete(){
    this.clienteService.delete(this.idCliente!).subscribe();
    this.snackService.openSnackbar("Cliente eliminato!");
  }
}
