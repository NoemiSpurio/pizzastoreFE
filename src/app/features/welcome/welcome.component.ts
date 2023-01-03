import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  admin: string = "ROLE_ADMIN";
  pizzaiolo: string = "ROLE_PIZZAIOLO";
  proprietario: string = "ROLE_PROPRIETARIO";
  fattorino: string = "ROLE_FATTORINO";
}
