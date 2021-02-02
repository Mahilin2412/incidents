import { Component, OnInit}  from '@angular/core';
import { Auth } from '../../models/Auth';
import { AuthService } from '../../services/auth.service';
import { EncrDecrService } from '../../services/encr-decr.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit{

  auth: Auth|any = {
    email: '',
    password_user: ''
  }
  user: any = [];

  constructor(private encrDecService: EncrDecrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    if (this.auth.password_user == '' || this.auth.email == '') {
        Swal.fire("Atención","Todos los campos son obligarios","error");
    } else {
      var pas = this.encrDecService.set('123456$#@$^@1ERF', this.auth.password_user);
      this.auth.password_user = pas;
      this.authService.auth(this.auth).subscribe(
        (resp: any)=>{
          this.router.navigate(['/incidents']);
          localStorage.setItem('token',resp.token);
          localStorage.setItem('usuario',resp.signed_user[0].name_user);
        },
        err => {
          const data = JSON.stringify(err);
          const data1 = JSON.parse(data);
          console.log(data1);
          if (data1.status == 404) {
            Swal.fire('!Error!',data1.error.message,'error');
          }
        }
      );
    }

  }





}
