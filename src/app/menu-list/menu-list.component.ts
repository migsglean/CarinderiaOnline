import { Component } from '@angular/core';
import { ProductService } from '../_shared/product.service';
import { Product } from '../_models/product';
import { Cart } from '../_models/cart';
import { CartService } from '../_shared/cart.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent {

  products: Product[] = [];
  cart: Cart = new Cart();
  
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {
    this.getProducts();
  }

  getProductsBreakfast(): any[] {
    let productBreakfast: Product[] = [];

    this.products.forEach((element) => {
      if (element.productCategory === "Breakfast") {
        productBreakfast.push(element)
      }
    });

    return productBreakfast
  }

  getProducts() {
  this.productService.getProducts().subscribe({
    next: (data) => {
      data.forEach((element) => {
        this.products.push(element)
      })
    },
    error: error => console.log(error)
  });
  }

  addCart(product: any){

    const user: any = localStorage.getItem('user')
   
    this.cart = {
      quantity: 1,
      status: "onProgress",
      studentId: user,
      productId: product.id,
      createAt: new Date()
    }

    this.cartService.addCart(this.cart).subscribe({
      next: () => console.log("Cart added successfully"),
      error: error => console.log(error)
    })
  }

}
