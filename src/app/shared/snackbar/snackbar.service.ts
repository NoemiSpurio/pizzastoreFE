import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackbar(data: string){
    this._snackBar.openFromComponent(SnackbarComponent, {
      data,
      duration: 3000,
      panelClass: 'mycsssnackbartest'
    });
  }
}
