import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taco } from '../../tables/taco';
import { TacoOrder } from 'src/app/tables/taco-order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/orders'

  constructor(private http: HttpClient) { }

  httpOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });

    return { headers: headers};
  }

  getAvailableTacosForNewOrder(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${this.apiUrl}/new`, this.httpOptions());
  }

  deleteSelectedTacoFromDatabase(tacoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/taco/${tacoId}`, this.httpOptions());
  }

  processOrder(order: TacoOrder): Observable<TacoOrder> {
    return this.http.post<TacoOrder>(`${this.apiUrl}/new`, order, this.httpOptions());
  }

}


