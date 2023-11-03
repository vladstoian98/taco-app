import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacoListComponent } from './components/taco-list-component/taco-list.component';
import { LoginComponent } from './components/login-component/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DesignTacoComponent } from './components/design-taco/design-taco.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tacos/past', component: TacoListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'design/taco', component: DesignTacoComponent },
  { path: 'order', component: OrderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
