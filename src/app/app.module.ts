import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { TopBarComponentComponent } from './top-bar-component/top-bar-component.component'
import { NavigationListComponentComponent } from './navigation-list-component/navigation-list-component.component';
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponentComponent,
    ProductListComponentComponent,
    TopBarComponentComponent,
    NavigationListComponentComponent,
    RegisterComponentComponent,
    ResetPasswordFormComponent,
    AdminDashboardComponent,
    UserListComponent,
    OrderHistoryComponent,
    ProductDashboardComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
