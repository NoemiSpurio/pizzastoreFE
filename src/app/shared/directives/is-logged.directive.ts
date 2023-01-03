import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective {

  constructor(private elementRef: ElementRef) { }

  @Input() set isLogged(isLoggedIn: boolean) {
    if(!isLoggedIn) {
      this.elementRef.nativeElement.style.display="none";
    } else {
      this.elementRef.nativeElement.style.display="block";
    }
  }
}
