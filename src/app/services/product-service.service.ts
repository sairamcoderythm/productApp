import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Product } from '../models/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class ProductServiceService {
  private productsUrl: string = 'https://reqres.in/api/users';

  // observable source
  private productCreatedSource = new Subject<Product>();

  // observable stream
  userCreated$ = this.productCreatedSource.asObservable();

  constructor(private http: Http) {}

  /**
   * Get all Products
   */
  getProducts(): Observable<Product[]> {
    return this.http.get(this.productsUrl)
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * Get a single user
   */
  getProduct(id: any): Observable<Product> {
    // attaching a token
    let headers = new Headers();
    let token   = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.productsUrl}/${id}`, { headers })
      .map(res => res.json().data)
      .catch(this.handleError);
  }

  /**
   * Create the Product
   */
  createProduct(Product: Product): Observable<Product> {
    return this.http.post(this.productsUrl, Product)
      .map(res => res.json())
      .catch(this.handleError);
  }

  /**
   * Update the Product
   */
  updateProduct(Product: Product): Observable<Product> {
    return this.http.put(`${this.productsUrl}/${Product.id}`, Product)
      .map(res => res.json())
      .catch(this.handleError);
  }

 
  productCreated(Product: Product) {
    this.productCreatedSource.next(Product);
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      let body   = err.json() || '';
      let error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}
