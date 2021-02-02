import { Component, OnDestroy, OnInit } from '@angular/core';
import { OperationsService} from '../../services/operations.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-operation-list',
  templateUrl: './operation-list.component.html',
  styleUrls: ['./operation-list.component.scss']
})
export class OperationListComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  operations: any = [];

  constructor(private operationsService: OperationsService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };
    this.getOperation();
  }
  getOperation() {
    this.operationsService.getOperations().subscribe(
      res => {
        this.operations = res;
        this.dtTrigger.next();
      },
      err => console.error(err)
    );
  }

  deleteOperation(Id_operation: string){
    this.operationsService.deleteOperation(Id_operation).subscribe(
      res => {
        console.log(res);
        this.getOperation();
      },
      err => console.log(err)
    )
    
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
