import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-registro-list',
  templateUrl: './registro-list.component.html',
  styleUrls: ['./registro-list.component.scss'] 
})
export class RegistroListComponent implements OnDestroy, OnInit {

    dtOptions: DataTables.Settings = {};
    registros: any = [];
    dtTrigger: Subject<any> = new Subject<any>();
  

  constructor(private registrosService: RegistrosService ) { }

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
      this.getRegistros();
    }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }
  
  getRegistros() {
    this.registrosService.getRegistros().subscribe(
      res => {
        this.registros = res;
        this.dtTrigger.next();
      },
      err => console.error(err)
    );
  }
  deleteRegistro(id: string) {
    this.registrosService.deleteRegistros(id).subscribe(
      res => {
        console.log(res);
        this.getRegistros();
      },
      err => console.log(err)
    )
  }

  
}
