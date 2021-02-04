import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Registro } from '../models/Registro';
import { Product } from '../models/Products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
  getIncident() {
    throw new Error('Method not implemented.');
  }
  getProducto() {
    throw new Error('Method not implemented.');
  }
  id(id: any, registro: Registro) {
    throw new Error('Method not implemented.');
  }
  idd(idd: any, producto: Product) {
    throw new Error('Method not implemented.');
  }

  API_URI = 'http://100.25.110.94:3000/api';


  constructor(private http: HttpClient) { }  

  getIncidents(){
    return this.http.get(`${this.API_URI}/incidents`);
  }
  getProducts(){
    return this.http.get(`${this.API_URI}/incidents/products`);
  }
  getRegistros() {
    return this.http.get(`${this.API_URI}/registro`);
  }

  deleteRegistros(id: string){
    return this.http.delete(`${this.API_URI}/registro/${id}`);
  }

  getRegistro(id: string) {
    return this.http.get(`${this.API_URI}/registro/${id}`);

  }
  saveRegistro(registro: Registro) {
    return this.http.post(`${this.API_URI}/registro`,registro);

  }


  updateRegistro(id: number | undefined, updatedRegistro: Registro): Observable<Registro> {
    return this.http.put(`${this.API_URI}/registro/${id}`, updatedRegistro);
  }

  

}
