import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponentComponent } from './login-page-component/login-page-component.component';
import { RegisterComponentComponent } from './register-component/register-component.component';
import { ResetPasswordFormComponent } from './reset-password-form/reset-password-form.component';
import { AuthGuard } from './auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductDashboardComponent } from './product-dashboard/product-dashboard.component';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuListLunchComponent } from './menu-list-lunch/menu-list-lunch.component';

const routes: Routes = [
  { path: '', component: LoginPageComponentComponent }, 
  { path: 'home', component: HomeDashboardComponent, canActivate: [AuthGuard] },
  { path: 'menu', component: MenuListComponent, canActivate: [AuthGuard]},
  { path: 'menu/lunch', component: MenuListLunchComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'order', component: OrderHistoryComponent, canActivate: [AuthGuard]},
  { path: 'product', component: ProductDashboardComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponentComponent},
  { path: 'reset', component: ResetPasswordFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
