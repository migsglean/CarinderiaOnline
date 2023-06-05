import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = "https://localhost:7003/api/order"

  constructor(private http: HttpClient) { }

  saveAllOrders(order: any[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, order)
  }
}
