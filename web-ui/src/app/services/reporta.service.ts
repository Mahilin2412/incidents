import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reporta } from '../models/Reporta';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportasService {
  idd(idd: any, reporta: Reporta) {
    throw new Error('Method not implemented.');
  }


  API_URI = 'http://172.19.0.4:3000/api';


  constructor(private http: HttpClient) { }  

  getReportas() {
    return this.http.get(`${this.API_URI}/reporta`);
  }

  deleteReportas(idd: string){
    return this.http.delete(`${this.API_URI}/reporta/${idd}`);
  }

  getReporta(idd: string) {
    return this.http.get(`${this.API_URI}/reporta/${idd}`);

  }
  saveReporta(reporta: Reporta) {
    return this.http.post(`${this.API_URI}/reporta`,reporta);

  }


  updateReporta(pro_id: number | undefined, updatedReporta: Reporta): Observable<Reporta> {
    return this.http.put(`${this.API_URI}/reporta/${pro_id}`, updatedReporta);
  }
}