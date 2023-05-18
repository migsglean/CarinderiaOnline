import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';

const routes: Routes = [
  { path: '', component: LoginPageComponentComponent }, 
  { path: 'home', component: ProductListComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
