import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { ReportasService } from '../../services/reporta.service';

  @Component({
    selector: 'app-reporta-list',
    templateUrl: './reporta-list.component.html',
    styleUrls: ['./reporta-list.component.scss']
  })
  export class ReportaListComponent implements OnDestroy, OnInit {

    dtOptions: DataTables.Settings = {};
    reportas: any = [];
    dtTrigger: Subject<any> = new Subject<any>();
  

    constructor(private reportaService: ReportasService ) { }

    
    ngOnInit(): void {
      this.dtOptions = {
        processing: true,
        pagingType: 'full_numbers',
        pageLength: 10,
        language: {
          url: "//cdn.datatables.net/plug-ins/1.10.22/i18n/Spanish.json"
        },
        destroy: true,
        autoWidth: false,
        ordering: true
      },
      this.getReporta();
    }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

    getReporta() {
      this.reportaService.getReportas().subscribe(
        res => {
          this.reportas = res;
          this.dtTrigger.next();
        },
        err => console.error(err)
      );
    }
    deleteReporta(idd: string) {
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
      this.reportaService.deleteReportas(idd).subscribe(
        res => { 
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('Eliminado.',data1.message,'success');
          }
        },
        err => console.error(err)
        
      );
    }
  });
}
}