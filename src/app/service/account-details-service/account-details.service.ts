import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChangeUsernameDetails } from './change-username-request';
import { ChangePasswordDetails } from './change-password-request';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  private changeUsernameUrl = 'http://localhost:8080/change/username';

  private changePasswordUrl = 'http://localhost:8080/change/password';

  constructor(private httpClient: HttpClient) { }

  httpOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
    });

    return { headers: headers};
  }

  changeUsername (oldUsername: string, newUsername: string): Observable<any> {
    let changeUsernameDetails: ChangeUsernameDetails  = new ChangeUsernameDetails(oldUsername, newUsername);
    return this.httpClient.post<any>(this.changeUsernameUrl, changeUsernameDetails, this.httpOptions());
  }

  changePassword (oldPassword: string, newPassword: string): Observable<any> {
    let changePasswordDetails: ChangePasswordDetails = new ChangePasswordDetails(oldPassword, newPassword);
    return this.httpClient.post<any>(this.changePasswordUrl, changePasswordDetails, this.httpOptions());
  }


  getUserEmail(): string | null {
    const token = localStorage.getItem('jwt');
    
    if(token) {
      const decoded = this.decodeJWT(token);
      return decoded ? decoded.sub : null;
    }

    return null;
  }

  decodeJWT(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      console.error('Error decoding token');
      return null;
    }
  }
}
