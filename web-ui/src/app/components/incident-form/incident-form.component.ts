import { Component, OnInit} from '@angular/core';
import { Incident } from '../../models/Incidents';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { IncidentsService } from '../../services/incidents.service';
import { EncrDecrService } from '../../services/encr-decr.service'

@Component({
  selector: 'app-incident-form',
  templateUrl: './incident-form.component.html',
  styleUrls: ['./incident-form.component.scss']
})
export class IncidentFormComponent implements OnInit {

  incident: Incident|any = {
    incident_log_id: 0,
    fk_product_id: 0,
    inl_IM: '',
    inl_description: '',
    escalation_date: new Date(),
    scaled_to: '',
    inl_status: 0,
    closing_date: new Date(),
    inl_comments: '',
    user_processed: ''
  };

  edit: boolean = false;

  products: any = [];

  user: any;

  constructor(private incidentService: IncidentsService, private router: Router, private activatedRoute: ActivatedRoute, private encryp: EncrDecrService) { }

  ngOnInit(): void {
    this.getUser();
    this.getProducts();
    this.getIncident();
  }

  getUser(){
    this.user = localStorage.getItem('usuario');
    this.incident.user_processed = this.user;
  }

  getIncident(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.incidentService.getIncident(params.id).subscribe(
        res => {
          this.incident = res;
          this.edit = true;
        },
        err => console.error(err)
        
      );
    }
  }

  getProducts(){
    this.incidentService.getProducts().subscribe(
      res => {
        this.products = res;
      },
      err => console.log(err)
    )
  }

  saveNewincident(){
    if (this.incident.fk_product_id == 0 || this.incident.escalation_date == '') {
      Swal.fire("Atención","Todos los campos son obligarios","error");
    } else {
      delete this.incident.incident_log_id;
      delete this.incident.closing_date;
      this.incidentService.saveIncident(this.incident)
      .subscribe(
        res => {
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('¡Incidente!',data1.msg,'success');
            this.router.navigate(['/incidents']);
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

  updateIncident(){
    this.incidentService.updateIncident(this.incident.incident_log_id, this.incident).subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Incidente!',data1.message,'success');
          this.router.navigate(['/incidents']);
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
