import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  private apirUrl: string = 'http://localhost:8080/drinks';

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

  getDrinks(): Observable<any> {
    return this.http.get(this.apirUrl + "/selection", this.httpOptions())
  }


}
