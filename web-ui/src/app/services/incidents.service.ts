import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Incident } from '../models/Incidents';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncidentsService {

  API_URI = 'http://172.19.0.4:3000/api';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${this.API_URI}/incidents/products`);
  }

  getIncidents(): Observable<Incident>{
    return this.http.get(`${this.API_URI}/incidents`);
  }

  getIncident(id: String){
    return this.http.get(`${this.API_URI}/incidents/${id}`);
  }

  saveIncident(incident: Incident){
    return this.http.post(`${this.API_URI}/incidents`, incident);
  }

  updateIncident(id: string|number, updateIncident: Incident) {
    return this.http.put(`${this.API_URI}/incidents/${id}`,updateIncident);
  }

  deleteIncident(id: string){
    return this.http.delete(`${this.API_URI}/incidents/${id}`);
  }
}
