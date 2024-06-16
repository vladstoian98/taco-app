import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../service/login-service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.loginService.isLoggedIn() && this.loginService.isAdmin()) {
      return true;
    } else if (!this.loginService.isLoggedIn()) {
      this.loginService.redirectUrl = url;

      this.router.navigate(['/login']);
      return false;
    }

    this.loginService.redirectUrl = url;

    this.router.navigate(['/home']);
    return false;
  }
}
