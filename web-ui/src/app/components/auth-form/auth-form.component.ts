import { Component, OnInit } from '@angular/core';
import { Users } from '../../models/registerAuth';
import { EncrDecrService } from '../../services/encr-decr.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnInit {

  registerUser: Users|any = {
    user_id: 0,
    user_names: '',
    user_surnames: '',
    name_user: '',
    email: '',
    password_user: '',
    created_at: new Date()
  }


  constructor(private encrDecService: EncrDecrService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  registerAuth(){

    var pas = this.encrDecService.set('123456$#@$^@1ERF', this.registerUser.password_user);
    this.registerUser.password_user = pas;
    delete this.registerUser.user_id;
    delete this.registerUser.created_at;
    this.authService.saveUser(this.registerUser).subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Usuario!',data1.msg,'success');
          this.router.navigate(['/login']);
        }
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
