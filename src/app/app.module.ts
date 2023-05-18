import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { TopBarComponentComponent } from './top-bar-component/top-bar-component.component'
import { NavigationListComponentComponent } from './navigation-list-component/navigation-list-component.component';
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponentComponent,
    ProductListComponentComponent,
    TopBarComponentComponent,
    NavigationListComponentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
