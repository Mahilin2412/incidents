import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { InternosService } from '../../services/internos.service';

@Component({
  selector: 'app-interno-list',
  templateUrl: './interno-list.component.html',
  styleUrls: ['./interno-list.component.scss']
})
export class InternoListComponent implements OnDestroy, OnInit {
  
  dtOptions: DataTables.Settings = {};
  internos: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  

  constructor(private internosService: InternosService ) { }
  

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
    this.getInternos();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

 
  getInternos() {
    this.internosService.getInternos().subscribe(
      res => {
        this.internos = res;
        this.dtTrigger.next();
      },
      err => console.error(err)
    );
  }
  deleteInterno(id: string) {
    this.internosService.deleteInternos(id).subscribe(
      res => {
        console.log(res);
        this.getInternos();
      },
      err => console.log(err)
    )
  }
}

