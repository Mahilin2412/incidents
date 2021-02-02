import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Service } from '../models/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  API_URI = 'http://172.19.0.4:3000/api';

  constructor(private http: HttpClient) { }

  getServices(){
    return this.http.get(`${this.API_URI}/services`);
  }
  getService(Id_service: string){
    return this.http.get(`${this.API_URI}/services/${Id_service}`);
  }
  deleteService(Id_service: string){
    return this.http.delete(`${this.API_URI}/services/${Id_service}`);
  }
  saveService(service: Service){
    return this.http.post(`${this.API_URI}/services`, service);
  }
  updateService(Id_service: string|number, updatedService: Service): Observable<Service>{
    return this.http.put(`${this.API_URI}/services/${Id_service}`, updatedService);
  }
  getIncident(){
    return this.http.get(`${this.API_URI}/services/select`);
  }
}
