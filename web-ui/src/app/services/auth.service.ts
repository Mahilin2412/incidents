import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/registerAuth';
import { Auth } from '../models/Auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any = [];

  constructor(private http: HttpClient,private router: Router) { }

  API_URI = 'http://100.25.110.94:3000/api';

  saveUser(user: Users){
    return this.http.post(`${this.API_URI}/auth`,user);
  }

  auth(auth: Auth){
    return this.http.post(`${this.API_URI}/auth/authentication`,auth);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  public get logIn(): boolean{
    return (localStorage.getItem('token') !== null);
  }
}
