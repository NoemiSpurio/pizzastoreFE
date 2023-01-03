import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { WhatRoleDirective } from './directives/what-role.directive';



@NgModule({
  declarations: [
    WhatRoleDirective
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
