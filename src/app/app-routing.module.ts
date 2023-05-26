import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';
import { ProductListComponentComponent } from './product-list-component/product-list-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { AuthGuard } from './auth.guard';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  { path: '', component: LoginPageComponentComponent }, 
  { path: 'home', component: ProductListComponentComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponentComponent},
  { path: 'reset', component: ResetPasswordFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
