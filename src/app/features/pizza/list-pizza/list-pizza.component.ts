import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Pizza } from 'src/app/model/pizza';
import { DataSearchServiceService } from 'src/app/shared/services/data-search-service.service';
import { DialogDeletePizzaComponent } from '../dialog-delete-pizza/dialog-delete-pizza.component';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-list-pizza',
  templateUrl: './list-pizza.component.html',
  styleUrls: ['./list-pizza.component.css']
})
export class ListPizzaComponent {

  constructor(private pizzaService: PizzaService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute,
    private dataSearchService: DataSearchServiceService) { }
  dataSource: MatTableDataSource<Pizza> = new MatTableDataSource<Pizza>();
  displayedColumns: string[] = ['id', 'descrizione', 'ingredienti', 'prezzoBase', 'attivo', 'azioni'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  urlSearchOperationFlag: string | null = ""

  ngOnInit(): void {
    this.getData();
  }

  openDialog(idPizza: number): void {
    const dialogRef = this.dialog.open(DialogDeletePizzaComponent, {
      width: 'auto',
      data: idPizza
    });

    dialogRef.afterClosed().subscribe(result => {
      this.pizzaService.getAllPizze().subscribe(res => {
        this.dataSource.data = res;
      })
    });
  }


  getData() {
    if (!this.router.url.includes('Search')) {
      this.pizzaService.getAllPizze().subscribe(res => {
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
    this.router.navigate(["pizza/detail/", id]);
  }

  addNew() {
    this.router.navigate(["pizza/create"]);
  }

  update(id: number) {
    this.router.navigate(["pizza/edit/", id]);
  }

  search() {
    this.router.navigate(["pizza/search"]);
  }

  list() {
    this.router.navigate(["pizza/list"]);
  }

  show(): boolean{
    if(this.router.url.includes('Search'))
      return false;
    else
      return true;
  }
}
