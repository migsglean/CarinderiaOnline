import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TopBarComponentComponent } from './top-bar-component/top-bar-component.component'
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { ProductService } from './_shared/product.service';
import { ProductEditModalComponent } from './product-edit-modal/product-edit-modal.component';
import { ProductDeleteModalComponent } from './product-delete-modal/product-delete-modal.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuListLunchComponent } from './menu-list-lunch/menu-list-lunch.component';
import { CartListComponent } from './cart-list/cart-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponentComponent,
    TopBarComponentComponent,
    RegisterComponentComponent,
    ResetPasswordFormComponent,
    AdminDashboardComponent,
    UserListComponent,
    OrderHistoryComponent,
    ProductDashboardComponent,
    ProductEditModalComponent,
    ProductDeleteModalComponent,
    HomeDashboardComponent,
    MenuListComponent,
    MenuListLunchComponent,
    CartListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
