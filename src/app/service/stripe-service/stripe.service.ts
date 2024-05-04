import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  private apiUrl = 'http://localhost:8080/stripe'

  httpOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });

    return { headers: headers};
  }

  constructor(private http: HttpClient) { }

  createPaymentIntent(amount: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create-payment-intent`, amount, this.httpOptions());
  }
}
