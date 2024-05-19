import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TacoListComponent } from './components/taco-list-component/taco-list.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { DesignTacoComponent } from './components/design-taco/design-taco.component';
import { OrderComponent } from './components/order/order.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DrinksComponent } from './components/drinks/drinks.component';
import { AccountDetailsComponentComponent } from './components/account-details-component/account-details-component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminUserModerationComponent } from './components/admin-user-moderation/admin-user-moderation-component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    TacoListComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DesignTacoComponent,
    OrderComponent,
    NavbarComponent,
    DrinksComponent,
    AccountDetailsComponentComponent,
    AdminUserModerationComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:8080"],
        disallowedRoutes: [] 
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
