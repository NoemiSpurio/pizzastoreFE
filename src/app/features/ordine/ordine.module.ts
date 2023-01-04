import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListOrdineComponent } from './list-ordine/list-ordine.component';
import { DetailOrdineComponent } from './detail-ordine/detail-ordine.component';
import { DialogDeleteOrdineComponent } from './dialog-delete-ordine/dialog-delete-ordine.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: 'list',
    component: ListOrdineComponent
  },
  {
    path: 'detail/:id',
    component: DetailOrdineComponent
  },
  {
    path: 'create',
    component: DetailOrdineComponent
  },
  {
    path: 'edit/:id',
    component: DetailOrdineComponent
  },
  {
    path: 'search',
    component: DetailOrdineComponent
  },
  {
    path: 'stats',
    component: DetailOrdineComponent //FIXARE
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    ListOrdineComponent,
    DetailOrdineComponent,
    DialogDeleteOrdineComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class OrdineModule { }
