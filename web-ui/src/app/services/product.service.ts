import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product } from '../models/Products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://172.19.0.4:3000/api';

  getProducts(){
    return this.http.get(`${this.API_URI}/products`);
  }

  getProduct(id: string){
    return this.http.get(`${this.API_URI}/products/${id}`);
  }

  saveProduct(product: Product){
    return this.http.post(`${this.API_URI}/products`, product);
  }

  updateProduct(id: string|number, updatedProduct: Product): Observable<Product> {
    return this.http.put(`${this.API_URI}/products/${id}`, updatedProduct)
  }

  deleteProduct(id: string){
    return this.http.delete(`${this.API_URI}/products/${id}`);
  }
}
