import { Component, HostBinding, OnInit } from '@angular/core';

import { Registro } from '../../models/Registro'; 
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegistrosService } from '../../services/registros.service';

@Component({ 
  selector: 'app-registro-form',
  templateUrl: './registro-form.component.html',
  styleUrls: ['./registro-form.component.scss']
})
export class RegistroFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  registro: Registro ={

    id: 0,
    fecha: new Date(),
    fk_incidente: '',
    relacionado: '',
    usuario: '', 
    pkfk_id_producto: 0

  };

  edit: boolean = false;
  fechas: any =[]
  products: any =[]
  incidents: any =[]
  user: any;

  constructor(private registrosService: RegistrosService, private router: Router, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.getProducts();
    this.getRegistro();
    this.getIncidents();
    this.getUser();
  }

  getUser(){
    this.user = localStorage.getItem('usuario');
    this.registro.usuario = this.user;
  }


  getRegistro(){
   const params = this.activatedRoute.snapshot.params;
   if (params.id) {
    this.registrosService.getRegistro(params.id)
      .subscribe(
        res => {
          console.log(res);
          this.registro = res;
          this.edit = true;
        },
        err => console.log(err)
      );
  }
  }

  getProducts(){
    this.registrosService.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

  getIncidents(){
    this.registrosService.getIncidents().subscribe(
      res => {
        this.incidents = res;
        
      },
      err => console.error(err)
      
    )
  }

  saveNewRegistro() {
    delete this.registro.id;

    this.registrosService.saveRegistro(this.registro)
    .subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('Registro!',data1.msg,'success');
          this.router.navigate(['/registros']);
        }
        
      },
    err => console.error(err)
    )
  }

  updateRegistro():void {
    
    this.registrosService.updateRegistro(this.registro.id,this.registro)
      .subscribe(
        res => {
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('¡Refistro!',data1.message,'success');
            this.router.navigate(['/registros']);
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


