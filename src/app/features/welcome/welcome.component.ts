import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

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

  constructor(public authService: AuthService){}
}
