import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListPizzaComponent } from './list-pizza/list-pizza.component';
import { DetailPizzaComponent } from './detail-pizza/detail-pizza.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DialogDeletePizzaComponent } from './dialog-delete-pizza/dialog-delete-pizza.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPizzaComponent
  },

  {
    path: 'listFromSearch',
    component: ListPizzaComponent
  },

  {
    path: 'detail/:id',
    component: DetailPizzaComponent
  },

  {
    path: 'create',
    component: DetailPizzaComponent
  },

  {
    path: 'edit/:id',
    component: DetailPizzaComponent
  },

  {
    path: 'search',
    component: DetailPizzaComponent
  },

  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }


];

@NgModule({
  declarations: [
    ListPizzaComponent,
    DetailPizzaComponent,
    DialogDeletePizzaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class PizzaModule { }
