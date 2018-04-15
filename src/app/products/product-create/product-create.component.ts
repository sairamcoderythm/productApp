import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/user';
import { ProductServiceService } from '../../services/product-service.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  product: Product = { name: '', price: '',description:'', category:'', avatar: '' };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private service: ProductServiceService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * Create a user
   */
  createProduct() {
    this.successMessage = '';
    this.errorMessage   = '';

    this.service.createProduct(this.product)
      .subscribe(product => {
        this.successMessage = 'Product was created!';
        console.log('product was created');

        // navigate back to the users page
        this.router.navigate(['/product-list']);
      })
  }

}
