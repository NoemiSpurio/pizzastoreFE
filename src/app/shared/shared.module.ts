import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { WhatRoleDirective } from './directives/what-role.directive';
import { IsLoggedDirective } from './directives/is-logged.directive';
import { SnackbarComponent } from './snackbar/snackbar.component';



@NgModule({
  declarations: [
    WhatRoleDirective,
    IsLoggedDirective,
    SnackbarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WhatRoleDirective,
    IsLoggedDirective
  ]
})
export class SharedModule { }
