import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Operation } from '../models/operations';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  API_URI = 'http://172.19.0.4:3000/api';

  constructor(private http: HttpClient) { }
    getOperations(){
      return this.http.get(`${this.API_URI}/operations`);
    }
    getOperation(Id_operation: string){
      return this.http.get(`${this.API_URI}/operations/${Id_operation}`);
    }
    deleteOperation(Id_operation: string){
      return this.http.delete(`${this.API_URI}/operations/${Id_operation}`);
    }
    saveOperation(operation: Operation){
      return this.http.post(`${this.API_URI}/operations`, operation);
    }
    updateOperation(Id_operation: string|number, updatedOperation: Operation): Observable<Operation>{
      return this.http.put(`${this.API_URI}/operations/${Id_operation}`, updatedOperation);
    }
}
