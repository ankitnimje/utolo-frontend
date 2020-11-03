import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductModelServer, serverResponse } from '../models/product.model';;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http: HttpClient) { }

  // To fetch all products from backend server
  getAllProducts(numberOfResults = 10) : Observable<serverResponse> {
    return this.http.get<serverResponse>(this.SERVER_URL + 'products', {
      params: {
        limit: numberOfResults.toString()
      }
    });
  }

  // Get single product from server
  getSingleProduct(id: number): Observable<ProductModelServer> {
    return this.http.get<ProductModelServer>(this.SERVER_URL + '/products' + id);
  }

  // Get products from one category
  getProductsFromCategory(catName: string) : Observable<ProductModelServer[]> {
    return this.http.get<ProductModelServer[]>(this.SERVER_URL + '/products/category/' + catName);
  }
}
