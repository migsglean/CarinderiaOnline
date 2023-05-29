import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Product } from '../_models/product';
import { ProductService } from '../_shared/product.service';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit{
  @ViewChild('myModal') myModal!: ElementRef;
  products: Product[] = [];
  isModalVisible = false;

  constructor(
    private productService : ProductService
  ) {}

  ngOnInit(): void {
    this.getProducts()
  }

  openModal(): void {
    this.isModalVisible = true;
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.myModal.nativeElement.style.display = 'none';
  }

  getProducts(): void {
    // this.productService.getProducts()
    //   .subscribe(products => this.products = products)
  }

  
  addProduct() {}
}
