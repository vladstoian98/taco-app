import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacoListComponent } from './components/taco-list-component/taco-list.component';
import { LoginComponent } from './components/login-component/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DesignTacoComponent } from './components/design-taco/design-taco.component';
import { OrderComponent } from './components/order/order.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { AuthGuard } from './guard/auth.guard';
import { AccountDetailsComponentComponent } from './components/account-details-component/account-details-component.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tacos/past', component: TacoListComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'design/taco', component: DesignTacoComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'drinks/selection', component: DrinksComponent, canActivate: [AuthGuard] },
  { path: 'account/details', component: AccountDetailsComponentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
