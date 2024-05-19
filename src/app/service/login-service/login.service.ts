import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/components/login/login-user';
import { Router } from '@angular/router';
import { TacoService } from '../taco-service/taco.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/login';

  private logoutUrl = 'http://localhost:8080/api/logout';

  private deleteTacosWithoutOrderUrl = 'http://localhost:8080/api/deleteTacosWithoutOrder';

  redirectUrl: String = new String();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  httpOptionsMethod() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
    });

    return { headers: headers};
  }

  constructor(
    private http: HttpClient, private router: Router, private tacoService: TacoService, 
    private jwtHelperService: JwtHelperService
  ) { }

  /** POST: login to the server */
  login (user: LoginUser): Observable<any> {
    return this.http.post<any>(this.loginUrl, user, this.httpOptions);
  }

  logout() {
    localStorage.removeItem(`drinksInOrder`);
    this.deleteTacosWithoutOrder();
    
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      this.http.post(this.logoutUrl, { token: jwtToken }).subscribe(
        () => {
          localStorage.removeItem('jwt'); 
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Logout error:', error);
        }
      );
    }
  }

  public isLoggedIn(): boolean {
    const jwtToken = localStorage.getItem('jwt');
    return !!jwtToken;
  }

  isAdmin(): boolean {
    return this.getUserRole() == 'admin';
  }

  getUserRole(): string {
    const token = localStorage.getItem('jwt');
    let decodedToken = null;
    if(token) {
      decodedToken = this.jwtHelperService.decodeToken(token);
    } 
    
    return decodedToken ? decodedToken?.authorities?.[0] : null;
  }

  deleteTacosWithoutOrder(): void {
    this.http.delete(this.deleteTacosWithoutOrderUrl, this.httpOptionsMethod()).subscribe({
      next: (response) => {
        console.log("The orderless tacos have been deleted successfully.")
      },
      error: (error) => {
        console.error("There was an error when trying to delete the orderless tacos.")
      }
    })
  }
}