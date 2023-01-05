import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { Stats } from 'src/app/model/stats';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  private apiServer = 'http://localhost:8080/api';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) { }


  getAllOrdini(): Observable<Ordine[]> {
    return this.http.get<Ordine[]>(this.apiServer + "/ordine");
  }

  findById(id: number): Observable<Ordine> {
    return this.http.get<Ordine>(this.apiServer + "/ordine/" + id);
  }

  delete(id: number) {
    return this.http.delete<boolean>(this.apiServer + "/ordine/" + id);
  }

  save(ordineInput: Ordine) {
    if (!ordineInput.id) {
      return this.http.post(this.apiServer + "/ordine", ordineInput, this.httpOptions);
    }
      return this.http.put(this.apiServer + "/ordine/" + ordineInput.id, ordineInput, this.httpOptions);
  }

  search(example: Ordine): Observable<Ordine[]> {
    return this.http.post<Ordine[]>(this.apiServer + "/ordine/search", example, this.httpOptions);
  }

  getAllFattorini() : Observable<User[]> {
    return this.http.get<User[]>(this.apiServer + "/utente/fattorini");
  }

  getRicaviTotali(dateInput: Stats): Observable<number> {
    return this.http.post<number>(this.apiServer + "/ordine/ricaviTotaliTra", dateInput, this.httpOptions);
  }

  getCostiTotali(dateInput: Stats): Observable<number> {
    return this.http.post<number>(this.apiServer + "/ordine/costiTotaliTra", dateInput, this.httpOptions);
  }

  getOrdiniTotali(dateInput: Stats): Observable<number> {
    return this.http.post<number>(this.apiServer + "/ordine/ordiniTotaliTra", dateInput, this.httpOptions);
  }

  getPizzeTotali(dateInput: Stats): Observable<number> {
    return this.http.post<number>(this.apiServer + "/ordine/pizzeOrdinateTra", dateInput, this.httpOptions);
  }

  getClientiVirtuosi(dateInput: Stats): Observable<Cliente[]> {
    return this.http.post<Cliente[]>(this.apiServer + "/ordine/clientiVirtuosiTra", dateInput, this.httpOptions);
  }

  getOrdiniPerFattorino() {
    // todo
  }
}
