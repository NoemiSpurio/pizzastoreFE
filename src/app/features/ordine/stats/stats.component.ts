import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { OrdineService } from '../ordine.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent {

  ricavi?: number;
  costi?: number;
  totOrdini?: number;
  totPizze?: number;

  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['nome', 'cognome'];
  
  show: boolean = false;

  constructor(private ordineService: OrdineService, private fb: FormBuilder, private router: Router) { }

  statsOrdineReactive: FormGroup = this.fb.group({
    dataInizio: this.fb.nonNullable.control('', [Validators.required]),
    dataFine: this.fb.nonNullable.control('', [Validators.required])
  });

  ngOnInit(): void {
    this.show = false;
  }

  caricaStats() {
    let dateStart = new Date(Date.parse(this.statsOrdineReactive.get('dataInizio')?.value)).toLocaleDateString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'});
    this.statsOrdineReactive.get('dataInizio')?.setValue(dateStart);

    let dateEnd = new Date(Date.parse(this.statsOrdineReactive.get('dataFine')?.value)).toLocaleDateString('it-IT', {year: 'numeric', month: '2-digit', day: '2-digit'});
    this.statsOrdineReactive.get('dataFine')?.setValue(dateEnd);

    this.ordineService.getRicaviTotali(this.statsOrdineReactive.value).subscribe(res => this.ricavi = res);
    this.ordineService.getCostiTotali(this.statsOrdineReactive.value).subscribe(res => this.costi = res);
    this.ordineService.getOrdiniTotali(this.statsOrdineReactive.value).subscribe(res => this.totOrdini = res);
    this.ordineService.getPizzeTotali(this.statsOrdineReactive.value).subscribe(res => this.totPizze = res);
    this.ordineService.getClientiVirtuosi(this.statsOrdineReactive.value).subscribe(res => {this.dataSource.data = res;});

    this.show = true;
  }

  back() {
    this.router.navigate(['welcome']);
  }
}
