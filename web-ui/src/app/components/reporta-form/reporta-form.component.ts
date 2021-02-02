import { Component,  HostBinding, OnInit } from '@angular/core';
import { Reporta } from '../../models/Reporta'; 
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ReportasService } from '../../services/reporta.service';

@Component({
  selector: 'app-reporta-form',
  templateUrl: './reporta-form.component.html',
  styleUrls: ['./reporta-form.component.scss']
})
export class ReportaFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  reporta: Reporta ={

    pro_id: 0,
    name_pro: '',
    acronym_product:'',
    created_at:''


  };
  edit: boolean = false;

  constructor(private reportasService: ReportasService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    const params = this.activatedRoute.snapshot.params;
   if (params.idd) {
    this.reportasService.getReporta(params.idd)
      .subscribe(
        res => {
          console.log(res);
          this.reporta = res;
          this.edit = true;
        },
        err => console.log(err)
      )
  }

}

saveNewReporta() {
  delete this.reporta.pro_id;

  this.reportasService.saveReporta(this.reporta)
  .subscribe(
    res => {
      const data = JSON.stringify(res);
      const data1 = JSON.parse(data);
      if (data1.status) {
        Swal.fire('Reporta!',data1.msg,'success');
        this.router.navigate(['/reporta']);
      }
      
    },
  err => console.error(err)
  )
}

updateReporta():void {
  
  this.reportasService.updateReporta(this.reporta.pro_id,this.reporta)
    .subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Reporta!',data1.message,'success');
          this.router.navigate(['/reporta']);
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
