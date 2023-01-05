import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSearchServiceService {

  constructor() { }

  data: any;

  setData(data: any) {
    this.data = data;
  }

  getData(): any {
    return this.data;
  }
}
