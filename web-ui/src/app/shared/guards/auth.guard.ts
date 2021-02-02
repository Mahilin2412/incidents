import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'jquery';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'

import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router){}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.logIn == true) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
      
   }

  }

