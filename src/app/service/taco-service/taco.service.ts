import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Taco } from '../../tables/taco';


@Injectable({
  providedIn: 'root'
})
export class TacoService {
  private apiUrl = 'http://localhost:8080/api/tacos';

  constructor(private http: HttpClient) { }

  httpOptions() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt') 
    });

    return { headers: headers};
  }

  getRecentTacos(): Observable<Taco[]> {
    return this.http.get<Taco[]>(`${this.apiUrl}?recent=true`, this.httpOptions());
  }

  getTacoById(id: number): Observable<Taco> {
    return this.http.get<Taco>(`${this.apiUrl}/${id}`);
  }

  createTaco(taco: Taco): Observable<Taco> {
    return this.http.post<Taco>(this.apiUrl, taco);
  }
}
