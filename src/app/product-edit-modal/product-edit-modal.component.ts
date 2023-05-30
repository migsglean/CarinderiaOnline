import { Component, Input, ElementRef, ViewChild, OnInit, EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../_shared/product.service';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {
  @Input() productSelected: any;
  @Output() getProducts: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('myModal') myModal!: ElementRef;

  form!: FormGroup;
  submitted = false;
  isModalVisible = false;  

  constructor (
    private formBuilder: FormBuilder,
    private productService: ProductService,
  ) {
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

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [this.productSelected.id],
      productName: [this.productSelected.productName, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      productType: [this.productSelected.productType, [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      productPrice: [this.productSelected.productPrice, Validators.required],
      productDescription: [''],
      productCode: ['']
    })
  }

  get f() {
    return this.form.controls
  }

  onSubmit() {
    this.submitted = true

    if (this.form.invalid) {
      return
    }

    this.productService.updateProduct(this.form.value).subscribe({
      next: () =>{
        this.getProducts.emit()
        this.closeModal()
        alert('Product updated successfully')
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
