import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../models/user';
import { ProductServiceService } from '../../services/product-service.service';
declare var $: any;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  // $viewProductModal: any;
  currentProductId = '';
   changeFlag = false;

  constructor(private service: ProductServiceService) { }

  ngOnInit() { 
    // this.$viewProductModal = $('#viewProduct');
    this.service.getProducts()
      .subscribe(products => this.products = products);   
  }

  openViewModal(id) {
    // this.currentProductId = id;
    // this.changeFlag = false;
    // this.service.getProduct({ _id: id })
    // .subscribe(
    //   products => {
    //     // this.products = products;
    //     $("#myModal").modal();
    //   },
    //   err => {
    //     console.log(err);
    //   });

 $("#myModal").modal();
  }



}
