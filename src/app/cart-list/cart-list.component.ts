import { Component } from '@angular/core';
import { CartService } from '../_shared/cart.service';
import { Cart } from '../_models/cart';
import { ProductService } from '../_shared/product.service';
import { Product } from '../_models/product';
import { Router } from '@angular/router';
import { OrderService } from '../_shared/order.service';
import { Order } from '../_models/order';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  carts: Cart[] = []
  orders: Order[] = []
  products: Product[] = []
  cart: Cart = new Cart()

  constructor(
    private orderSerivce: OrderService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ){
    this.getCartsUser()
    this.getAllProducts()
  }

  checkout() {
    let result = this.getDisplayItems()

    if (result.length < 1) {
      return ;
    }
    
    result.forEach((data) => {
      this.orders.push({
        semiAmount: data.exactAmount,
        status: "complete",
        productId: data.productId,
        studentId: data.studentId,
        createdAt: new Date()
      })
    })

    this.orderSerivce.saveAllOrders(this.orders).subscribe(() => console.log('Order Successfully'))

    //delete items from cart table 
    this.cartService.deleteAll(result[0].studentId).subscribe(() => console.log('Deleted all successfully'))

    this.router.navigate(['menu'])
  }

  goBack(){
    this.router.navigate(['menu'])
  }

  decrementQuantiy(cartProd: any) {
    this.cart = {
      cartId: cartProd.cartId,
      quantity: cartProd.quantity - 1,
      studentId: cartProd.studentId,
      productId: cartProd.productId
    }

   if (cartProd.quantity == 1) {
    //still error
      this.cartService.delete(this.cart).subscribe({
        next: ()=> console.log('Deleted Successfully'),
        error: error => console.log(error)
      })
      return
   }

   this.cartService.update(this.cart).subscribe(() => console.log('Updated Successfully'))

  }

  incrementQuantity(cartProd: any) {
    this.cart = {
      cartId: cartProd.cartId,
      quantity: cartProd.quantity + 1,
      studentId: cartProd.studentId,
      productId: cartProd.productId
    }

    this.cartService.update(this.cart).subscribe(() => console.log('Updated Successfully'))
  }

  getTotalAmount() {
    let cartProd: any = this.getDisplayItems()
    let totalAmount = cartProd.reduce((acc: any, curr: any) => acc + curr.exactAmount, 0)
    return totalAmount
  }

  getDisplayItems() {
  let cartProd: any[] = [];

  this.carts.forEach((item: any) =>{
    this.products.forEach((data: any) => {
      if(item.productId === data.id) {
        cartProd.push({
          ...item,
          'product': data,
          'exactAmount': item.quantity * data.productPrice
        })
      }
    })
  })
  
    return cartProd
  }

  getAllProducts(){
    this.productService.getProducts().subscribe((data) => {
      data.forEach((product) => {
        this.carts.forEach((cart) => {
          if(product.id == cart.productId) {
            this.products.push(product)
          }
        })
      }
      )
    })
  }


  getCartsUser() {
    const user: any = localStorage.getItem('user')
    this.cartService.getCart(user).subscribe((data) => {
      data.forEach((element: any) => {
        this.carts.push(element)
      })
    })
  }

}
