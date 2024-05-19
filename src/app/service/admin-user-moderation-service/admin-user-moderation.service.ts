import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminUserModerationService {

  private apiUrl: string = 'http://localhost:8080/admin/users';

  constructor(private http: HttpClient) { }

  httpOptions() {
    const jwt = localStorage.getItem('jwt');

    console.log(localStorage.getItem('jwt'));

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });

    return { headers: headers};
  }

  getUserForModeration(username: string): Observable<any> {
    const url = `${this.apiUrl}/${username}`;
    return this.http.get(url, this.httpOptions());
  }

  deleteSelectedUser(username: string) : Observable<any> {
    const url = `${this.apiUrl}/delete/${username}`;
    return this.http.delete(url, this.httpOptions());
  }
}
