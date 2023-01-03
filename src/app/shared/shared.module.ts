import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { WhatRoleDirective } from './directives/what-role.directive';
import { IsLoggedDirective } from './directives/is-logged.directive';



@NgModule({
  declarations: [
    WhatRoleDirective,
    IsLoggedDirective
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WhatRoleDirective
  ]
})
export class SharedModule { }
