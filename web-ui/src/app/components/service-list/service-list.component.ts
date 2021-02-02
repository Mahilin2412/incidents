import { Component, OnDestroy, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ServicesService } from '../../services/services.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  services: any = [];


  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getService();

  }

  getService() {
    this.servicesService.getServices().subscribe(
      res => {
        console.log(res);
        this.services = res;
        this.dtTrigger.next();
      },
      err => console.error(err)
    );
  }

  deleteService(Id_service: string){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then(result => {
      this.servicesService.deleteService(Id_service).subscribe(
        res => {
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('Eliminado.',data1.message,'success');
          }
        },
        err => console.log(err)
      )
    })
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
