import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacoListComponent } from './components/taco-list-component/taco-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DesignTacoComponent } from './components/design-taco/design-taco.component';
import { OrderComponent } from './components/order/order.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { AuthGuard } from './guard/auth.guard';
import { AuthGuardAdmin } from './admin-guard/auth.guard.admin';
import { AccountDetailsComponentComponent } from './components/account-details-component/account-details-component';
import { AdminUserModerationComponent } from './components/admin-user-moderation/admin-user-moderation-component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tacos/past', component: TacoListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'design/taco', component: DesignTacoComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'drinks/selection', component: DrinksComponent, canActivate: [AuthGuard] },
  { path: 'account/details', component: AccountDetailsComponentComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: AdminUserModerationComponent, canActivate: [AuthGuardAdmin] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
