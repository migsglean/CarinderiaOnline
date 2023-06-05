import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../_models/order';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:7003/api/order"

  constructor(private http: HttpClient) { }

  saveAllOrders(order: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, order)
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/all`)
  }
}
