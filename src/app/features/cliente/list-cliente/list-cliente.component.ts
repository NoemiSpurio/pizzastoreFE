import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { DataSearchServiceService } from 'src/app/shared/services/data-search-service.service';
import { ClienteService } from '../cliente.service';
import { DialogDeleteClienteComponent } from '../dialog-delete-cliente/dialog-delete-cliente.component';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent {

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog,
    private dataSearchService: DataSearchServiceService) { }

  dataSource: MatTableDataSource<Cliente> = new MatTableDataSource<Cliente>();
  displayedColumns: string[] = ['id', 'nome', 'cognome', 'indirizzo', 'attivo', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  ngOnInit(): void {
      this.getData();
  }

  getData() {
    if(!this.router.url.includes('Search')){
    this.clienteService.getAllClienti().subscribe(res => {
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
    this.router.navigate(["cliente/detail/", id]);
  }

  openDialog(idCliente: number): void {
    const dialogRef = this.dialog.open(DialogDeleteClienteComponent, {
      width: 'auto',
      data: idCliente
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getData();
      this.dataSource.paginator = this.paginator;
    })
  }

  addNew() {
    this.router.navigate(["cliente/create"]);
  }

  update(id: number) {
    this.router.navigate(["cliente/edit/", id]);
  }

  search() {
    this.router.navigate(["cliente/search"]);
  }

  list() {
    this.router.navigate(["cliente/list"]);
  }

  show(): boolean{
    if(this.router.url.includes('Search'))
      return false;
    else
      return true;
  }
}
