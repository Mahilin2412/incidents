import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interno } from '../models/Interno';
import { Product } from '../models/Products';
import { Reporta } from '../models/Reporta';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InternosService {
  getProducto() {
    throw new Error('Method not implemented.');
  }
  getReporta() {
    throw new Error('Method not implemented.');
  }
  id(id: any, interno: Interno) {
    throw new Error('Method not implemented.');
  }
  idd(idd: any, producto: Product) {
    throw new Error('Method not implemented.');
  }
  i(idd: any, producto: Product) {
    throw new Error('Method not implemented.');
  }
  

  API_URI = 'http://100.25.110.94:3000/api';


  constructor(private http: HttpClient) { }  
  getProducts(){
    return this.http.get(`${this.API_URI}/incidents/products`);
  }
  getReportas() {
    return this.http.get(`${this.API_URI}/reporta`);
  }
  getInternos() {
    return this.http.get(`${this.API_URI}/interno`);
  }

  deleteInternos(id: string){
    return this.http.delete(`${this.API_URI}/interno/${id}`);
  }

  getInterno(id: string) {
    return this.http.get(`${this.API_URI}/interno/${id}`);

  }
  saveInterno(registro: Interno) {
    return this.http.post(`${this.API_URI}/interno`,registro);

  }


  updateInterno(id: number | undefined, updatedInterno: Interno): Observable<Interno> {
    return this.http.put(`${this.API_URI}/interno/${id}`, updatedInterno);
  }

  

}
