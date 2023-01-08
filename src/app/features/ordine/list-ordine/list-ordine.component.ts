import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Ordine } from 'src/app/model/ordine';
import { DataSearchServiceService } from 'src/app/shared/services/data-search-service.service';
import { DialogDeleteOrdineComponent } from '../dialog-delete-ordine/dialog-delete-ordine.component';
import { OrdineService } from '../ordine.service';

@Component({
  selector: 'app-list-ordine',
  templateUrl: './list-ordine.component.html',
  styleUrls: ['./list-ordine.component.css']
})
export class ListOrdineComponent {

  constructor(private ordineService: OrdineService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
              private dataSearchService: DataSearchServiceService) { }

  dataSource: MatTableDataSource<Ordine> = new MatTableDataSource<Ordine>();
  displayedColumns: string[] = ['id', 'data', 'codice', 'costo', 'closed', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  clientiDataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>()
  displayedClientiColumns: string[] = ['id', 'nome', 'cognome', 'indirizzo', 'attivo'];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    if (!this.router.url.includes('Search')) {
      this.ordineService.getAllOrdini().subscribe(res => {
        this.dataSource.data = res;
      });
    } else if(!this.router.url.includes('consegne')) {
      this.ordineService.getOrdiniPerFattorino().subscribe(res => {
        this.dataSource.data = res;
      });
    } else {
      this.dataSource.data = this.dataSearchService.getData();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  showDetail(id: number) {
    this.router.navigate(["ordine/detail/", id]);
  }

  openDialog(idOrdine: number): void {
    const dialogRef = this.dialog.open(DialogDeleteOrdineComponent, {
      width: 'auto',
      data: idOrdine
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.dataSource.paginator = this.paginator;
    })
  }

  addNew() {
    this.router.navigate(["ordine/create"]);
  }

  update(id: number) {
    this.router.navigate(["ordine/edit/", id]);
  }

  search() {
    this.router.navigate(["ordine/search"]);
  }
}
