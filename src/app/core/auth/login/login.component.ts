import { Component } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user';
import { AuthService } from '../auth.service';

export interface LoginForm extends FormGroup<{
  username: FormControl<string>;
  password: FormControl<string>;
}>{}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user?: User;
  destroy$: Subject<boolean> = new Subject();
  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder) { }

  userForm: LoginForm = this.fb.group({
    username: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
    password: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
  });

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngOnInit(): void {
  }

  login(): void {
      this.authService.login(this.userForm.getRawValue()).pipe(
        takeUntil(this.destroy$)
        ).subscribe(res => {
          this.authService.setUserLogged(res);
      });
    }
}
