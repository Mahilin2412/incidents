import {AfterViewInit ,Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { DataTableDirective } from 'angular-datatables'

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements AfterViewInit, OnDestroy, OnInit {

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  products: any = [];
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private productService: ProductService) { }

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
    }
  }

  ngAfterViewInit(): void{
    this.getProducts();
  }

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  rerender(): void{
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) =>{
      this.getProducts();
      dtInstance.destroy();
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe(
      res => {
        this.products = res;
        this.dtTrigger.next();
      },
      err => console.error(err)
      
    );
  }

  deleteProduct(id: string){
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
        this.productService.deleteProduct(id).subscribe(
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
