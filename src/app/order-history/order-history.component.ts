import { Component } from '@angular/core';
import { OrderService } from '../_shared/order.service';
import { Order } from '../_models/order';
import { ProductService } from '../_shared/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent {
  public orders: Order[] = []
  public products: Product[] = []
  currentPage = 1;
  itemsPerPage = 10;

  
  constructor(
    private orderService: OrderService,
    private productService: ProductService
  ){
    this.getAllOrders()
  }

  getAllDisplayItems() {
    let result: any[] =[]
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    if (this.products.length > 1) {
      this.products.forEach((data) => {
        this.orders.forEach((element) => {
          if(data.id === element.productId){
            result.push({
              ...element,
              'product': data
            })
          }
        })
      })
    }

    result = result.sort((a, b) => b.orderId - a.orderId)

    return result.slice(startIndex, endIndex);
  }
  

  getAllOrders() {
    this.productService.getProducts().subscribe(data => this.products.push(...data))
    this.orderService.getAllOrders().subscribe((data) => this.orders.push(...data))

    }

}
