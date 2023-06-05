import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../_models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private apiUrl = "https://localhost:7003/api/cart"

  constructor(private http: HttpClient) { }

  addCart(cart: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, cart)
  }

  getCart(studentId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/all?studentId=${studentId}`)
  }

  update(cart: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, cart)
  }

  delete(cart: any): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${cart.productId}`, cart)
  }

  deleteAll(studentId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?studentId=${studentId}`)
  } 
  
}
