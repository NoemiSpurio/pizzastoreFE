import { Directive, ElementRef, Input } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Directive({
  selector: '[whatRole]'
})
export class WhatRoleDirective {

  @Input() set whatRole(role: string) {
    this.authService.getUserLogged().subscribe(res => {
      if (res?.roles?.find(r => r === role)) {
        this.elementRef.nativeElement.style.display = 'block';
      } else {
        this.elementRef.nativeElement.style.display = 'none';
      }
    })
  }

  constructor(private authService: AuthService, private elementRef: ElementRef) { }

}
