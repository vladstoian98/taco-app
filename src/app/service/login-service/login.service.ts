import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from 'src/app/components/login-component/login-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'http://localhost:8080/api/login';

  private logoutUrl = 'http://localhost:8080/api/logout';

  redirectUrl: String = new String();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient, private router: Router
  ) { }

  /** POST: login to the server */
  login (user: LoginUser): Observable<any> {
    return this.http.post<any>(this.loginUrl, user, this.httpOptions);
  }

  logout() {
    // Retrieve the JWT from localStorage
    const jwtToken = localStorage.getItem('jwt');

    if (jwtToken) {
      // Call the logout endpoint and pass the token
      this.http.post(this.logoutUrl, { token: jwtToken }).subscribe(
        () => {
          localStorage.removeItem('jwt'); // Clear the JWT from localStorage
          this.router.navigate(['/']); 
        },
        error => {
          console.error('Logout error:', error);
        }
      );
    }
  }

  public isLoggedIn(): boolean {
    // Check for the presence of the JWT in local storage
    const jwtToken = localStorage.getItem('jwt');
    return !!jwtToken;
  }
}