import { Component, HostBinding, OnInit } from '@angular/core';
import { combineLatest, from } from 'rxjs';
import Swal from 'sweetalert2';
import { Service } from 'src/app/models/services';
import { ServicesService } from '../../services/services.service';
import { OperationsService } from '../../services/operations.service';
import { IncidentsService } from '../../services/incidents.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.scss']
})
export class ServiceFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  service: Service|any = {
    Id_service: 0,
    incident_log_id: 0,
    fallo: '',
    Id_operation: 0,
    start_dates: new Date,
    end_date: new Date,
    comments: ''

  };

  edit: boolean = false;

  operation: any = [];
  incident: any = [];



  constructor(private servicesService: ServicesService, private router: Router, private activedRoute: ActivatedRoute, private operationsService: OperationsService, private incidentsService: IncidentsService) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    this.getOperation();
    this.getIncident();
    if (params.Id_service) {
      this.servicesService.getService(params.Id_service)
      .subscribe(
        res => {
          console.log(res);
          this.service = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
    
  }
  saveNewService(){
    if (this.service.incident_log_id == 0 || this.service.Id_operation == 0) {
      Swal.fire("Atención","Todos los campos son obligarios","error");
    } else {
    delete this.service.Id_service;
    this.servicesService.saveService(this.service)
    .subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Servicio!',data1.msg,'success');
          this.router.navigate(['/services']);
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
    )
    }
  }
  updateService(){
     this.servicesService.updateService(this.service.Id_service, this.service)
    .subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Servicio!',data1.message,'success');
          this.router.navigate(['/services']);
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
    )

  }
  cancelSavesService(){
      this.router.navigate(['/services']);
  }

  getOperation(){
    this.operationsService.getOperations().subscribe(
      res => {
        console.log(res);
        this.operation = res;
      },
      err => console.error(err)
    )
  }

  getIncident(){
    this.servicesService.getIncident().subscribe(
      res => {
        console.log(res);
        this.incident = res;
      },
      err => console.error(err)
    )
  }
}
