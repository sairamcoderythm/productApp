import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/user';
import { ProductServiceService } from '../../services/product-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Product;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: ProductServiceService, private route: ActivatedRoute) { }

  ngOnInit() { 
    // grab the Product
    let id = this.route.snapshot.params['id'];
    this.service.getProduct(id).subscribe(product => this.product = product);
  }

  /**
   * Update the Product
   */
  updateProduct() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.updateProduct(this.product)
      .subscribe(
        product => {
          this.successMessage = 'Product was updated.';
          console.log('product was updated');
        },
        err => {
          this.errorMessage = err;
          console.error(err);
        }        
      );
  }


}