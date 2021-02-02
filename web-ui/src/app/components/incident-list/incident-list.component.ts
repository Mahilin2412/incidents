import { AfterViewInit ,Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables';
import { Incident } from '../../models/Incidents';
import { IncidentsService } from '../../services/incidents.service';

@Component({
  selector: 'app-incident-list',
  templateUrl: './incident-list.component.html',
  styleUrls: ['./incident-list.component.scss']
})
export class IncidentListComponent implements AfterViewInit,OnDestroy,OnInit {
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings|any = {};
  incidents: any;
  dtTrigger: Subject<any> = new Subject<any>();
  closeResult = '';
  constructor(private incidentService: IncidentsService) { }

  ngOnInit(): void {
    this.dtOptions = {
      processing: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
      },
      responsive: true,
      destroy: true,
      autoWidth: false,
      order: [5,"asc"],
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i>',
          titleAttr: 'Imprimir'
        },
        {
          extend: 'excel',
          text: '<i class="far fa-file-excel"></i>',
          titleAttr: 'Excel'
        },
        {
          extend: 'colvis',
          text: '<i class="fas fa-columns"></i>',
          titleAttr: 'Visualización'
        }
      ]
    }
  }

  ngAfterViewInit(): void {
    this.getIncidents();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  rerender(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) =>{
      this.getIncidents();
      dtInstance.destroy();
    })
  }

  getIncidents(){
    this.incidentService.getIncidents().subscribe(
      (data: any) => {
        this.incidents = data;
        this.dtTrigger.next();
      },
      err => console.error(err)
      
    );
  }

  deleteIncident(id: string){
    Swal.fire({
      title: "¿Estas seguro?",
      text: "¡No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then(result => {
      if (result.value) {
        this.incidentService.deleteIncident(id).subscribe(
          res => {
            const data = JSON.stringify(res);
            const data1 = JSON.parse(data);
            if (data1.status) {
              Swal.fire('Eliminado.',data1.message,'success');
              this.rerender();
            }
          },
          err => console.error(err)
          
        );
      }
    });
  }
}
