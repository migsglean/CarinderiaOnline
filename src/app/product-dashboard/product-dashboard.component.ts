import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { Product } from '../_models/product';
import { ProductService } from '../_shared/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-dashboard',
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['./product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit{
  @ViewChild('myModal') myModal!: ElementRef;
  products: Product[] = []; // for getting all product
  submitted = false;
  isModalVisible = false;
  form!: FormGroup;
  public product: Product = new Product() // for adding product
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private productService : ProductService,
    private formBuilder: FormBuilder
  ) {
    this.getProducts();
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      productType: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      productDescription: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      productPrice: ['', Validators.required],
    })
  }

  openModal(): void {
    this.isModalVisible = true;
    this.myModal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.myModal.nativeElement.style.display = 'none';
    this.submitted = false
  }

  getProducts(): void {
    this.productService.getProducts()
      .subscribe((products: any) => {
        this.products = products
      })
  }

  getDisplayedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.products.slice(startIndex, endIndex);
  }

  get f() {
    return this.form.controls
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.product = {
      productName: this.f['productName'].value,
      productType: this.f['productType'].value,
      productDescription: this.f['productDescription'].value,
      productPrice: this.f['productPrice'].value,
      productCode: this.productService.generateProductCode(this.f['productName'].value)
    }

    this.productService.addProduct(this.product)
    .subscribe({
      next : (data) => {
        this.products.push(data)
        this.form.reset()
        this.closeModal()
        alert('Product added successfully')
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
