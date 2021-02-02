import { Component, HostBinding, OnInit } from '@angular/core';
import { Registro } from '../../models/Registro'; 
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InternosService } from '../../services/internos.service';
import { Interno } from 'src/app/models/Interno';
@Component({
  selector: 'app-interno-form',
  templateUrl: './interno-form.component.html',
  styleUrls: ['./interno-form.component.scss']
})
export class InternoFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  interno: Interno ={

    id_internos: 0,
    pkfk_id_reporta: 0,
    fecha: new Date(),
    incidente: '',
    pkfk_id_producto: 0,
    origen: '',
    tramito: ''

  };

  edit: boolean = false;
  products: any =[]
  reportas: any =[]


  constructor(private internosService: InternosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProducts();
    this.getInterno();
    this.getReportas();
    
  }
  getInterno(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
     this.internosService.getInterno(params.id)
       .subscribe(
         res => {
           this.interno = res;      
           this.edit = true;
         },
         err => console.log(err)
       );
   }
   }
 
   getProducts(){
    this.internosService.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

   getReportas() {
     this.internosService.getReportas().subscribe(
       res => {
         this.reportas = res;
         console.log(res);
         
       },
       err => console.error(err)
     );
   }
 
   saveNewInterno() {
     delete this.interno.id_internos;
 
     this.internosService.saveInterno(this.interno)
     .subscribe(
     res => {
       const data = JSON.stringify(res);
       const data1 = JSON.parse(data);
       if (data1.status) {
         Swal.fire('Interno!',data1.msg,'success');
         this.router.navigate(['/internos']);
       }
       
     },
     err => console.error(err)
     )

   }
 
   updateInterno():void {
     
     this.internosService.updateInterno(this.interno.id_internos,this.interno)
       .subscribe(
        res => {
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('¡Interno!',data1.message,'success');
            this.router.navigate(['/internos']);
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

