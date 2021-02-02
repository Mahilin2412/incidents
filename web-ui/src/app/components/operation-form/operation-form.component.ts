import { Component, HostBinding, OnInit } from '@angular/core';
import { Operation } from '../../models/operations';
import { OperationsService } from '../../services/operations.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrls: ['./operation-form.component.scss']
})
export class OperationFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  operation: Operation|any = {
    Id_operation: 0,
    Name: '',
    Initials: ''
  };

  edit: boolean = false;

  constructor(private operationsService: OperationsService, private router: Router, private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activedRoute.snapshot.params;
    if (params.Id_operation) {
      this.operationsService.getOperation(params.Id_operation)
      .subscribe(
        res => {
          console.log(res);
          this.operation = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  saveNewOperation(){
    delete this.operation.Id_operation;
    this.operationsService.saveOperation(this.operation)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/operations']);
      },
      err => console.error(err)
    )
  }

  updateOperation(){

    this.operationsService.updateOperation(this.operation.Id_operation, this.operation)
    .subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/operations']);
      },
      err => console.error(err)
    )

  }
  cancelSavesOperation(){
      this.router.navigate(['/operations']);
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
}
