import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListClienteComponent } from './list-cliente/list-cliente.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DetailClienteComponent } from './detail-cliente/detail-cliente.component';
import { DialogDeleteClienteComponent } from './dialog-delete-cliente/dialog-delete-cliente.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListClienteComponent
  },
  {
    path: 'detail/:id',
    component: DetailClienteComponent
  },

  {
    path: 'create',
    component: DetailClienteComponent
  },

  {
    path: 'edit/:id',
    component: DetailClienteComponent
  },

  {
    path: 'search',
    component: DetailClienteComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    ListClienteComponent,
    DetailClienteComponent,
    DialogDeleteClienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    SharedModule,
    MaterialModule
  ]
})
export class ClienteModule { }
