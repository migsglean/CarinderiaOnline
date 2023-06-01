import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../_shared/product.service';

@Component({
  selector: 'app-product-delete-modal',
  templateUrl: './product-delete-modal.component.html',
  styleUrls: ['./product-delete-modal.component.scss']
})
export class ProductDeleteModalComponent {
  @Input() productSelected: any;
  @Output() getProducts: EventEmitter<void> = new EventEmitter<void>();

  constructor (
    private productService: ProductService
  ) {}

  handleDelete() {
    this.productService.deleteProduct(this.productSelected)
    .subscribe({
      next: () => {
        this.getProducts.emit()
        console.log("Deleted Successfully")
      },
      error: error => {
        console.log(error)
      }
    })
  } 
}
