import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Products';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  product: Product|any = {
    product_id: 0,
    name_product: '',
    acronym_product: '',
    created_at: new Date()
  };

  edit: boolean = false;

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(){
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.productService.getProduct(params.id).subscribe(
        res => {
          this.product = res;
          this.edit = true;
        },
        err => console.error(err)
        
      );
    }
  }

  saveNewProduct(){
    if (this.product.name_product == '') {
      Swal.fire("Atención","Todos los campos son obligarios","error");
    } else {
      delete this.product.product_id;
      delete this.product.created_at;
  
      this.productService.saveProduct(this.product).subscribe(
        res => {
          const data = JSON.stringify(res);
          const data1 = JSON.parse(data);
          if (data1.status) {
            Swal.fire('¡Producto!',data1.msg,'success');
            this.router.navigate(['/products']);
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

  updateProduct(){
    delete this.product.created_at;

    this.productService.updateProduct(this.product.product_id, this.product).subscribe(
      res => {
        const data = JSON.stringify(res);
        const data1 = JSON.parse(data);
        if (data1.status) {
          Swal.fire('¡Producto!',data1.message,'success');
          this.router.navigate(['/products']);
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
