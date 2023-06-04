import { Component } from '@angular/core';
import { CartService } from '../_shared/cart.service';
import { Cart } from '../_models/cart';
import { ProductService } from '../_shared/product.service';
import { Product } from '../_models/product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent {
  carts: Cart[] = []
  products: Product[] = []

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ){
    this.getCartsUser()
    this.getAllProducts()
    console.log(this.carts)
    console.log(this.products)
  }

  getDisplayItems() {
   let cartProd: any[] = [];

  this.carts.forEach((item) =>{
    this.products.forEach((data) => {
      if(item.productId === data.id) {
        cartProd.push({
          ...item,
          'product': data
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
