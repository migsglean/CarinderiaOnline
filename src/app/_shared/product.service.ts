import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = "https://localhost:7003/api/product"

  constructor( private http: HttpClient) {
   }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.apiUrl +'/all')
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(this.apiUrl + '/add', product)
  }

  generateProductCode(productName: string): string {
    // Generate a random 6-digit number
    const randomDigits = Math.floor(Math.random() * 900000) + 100000;

    // Create a timestamp string
    const timestamp = Date.now().toString();

    // Combine the prefix, timestamp, random digits, and product name
    const productCode = 'PRD-' + timestamp + '-' + randomDigits + '-' + productName;

    return productCode;
  }


}
