import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, switchMap, of } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiServer = 'http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient, private router: Router) { }

  private userLoggedSubject$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)

  login(loginForm: User): Observable<User> {
    return this.http.post<{'jwt-token': string}>(this.apiServer + "/auth/login", JSON .stringify(loginForm), this.httpOptions).pipe(
      switchMap(res => of({ username: loginForm.username, token: res['jwt-token'] }))
    );
  }

  setUserLogged(user: User | null) {
    this.userLoggedSubject$.next(user);
    this.http.get<string[]>(this.apiServer + "/utente/rolesInfo", this.httpOptions).subscribe(rolesItem => 
      { user!.roles = [...rolesItem];
        this.userLoggedSubject$.next(user);
      });
  }

  getUserLogged(): Observable<User | null> {
    return this.userLoggedSubject$.asObservable();
  }

  getUserRoles(): Observable<{roles: string[]}> {
    return this.http.get<{roles: string[]}>(this.apiServer + "/utente/rolesInfo", this.httpOptions);
  }

  isLoggedIn(): boolean {
    return this.userLoggedSubject$.value ? !!this.userLoggedSubject$.value.token : false;
  }

  getUserToken(): string | null | undefined  {
    return this.userLoggedSubject$.value ? this.userLoggedSubject$.value.token : null;
  }

  hasRole(role: string): boolean {
    if(this.userLoggedSubject$.value?.roles?.includes(role))
      return true;
    else
      return false;
  }

  logout() {    
    this.setUserLogged(null);
  }
}
