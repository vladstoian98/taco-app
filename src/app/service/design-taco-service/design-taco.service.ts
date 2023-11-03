import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taco } from 'src/app/tables/taco';

@Injectable({
  providedIn: 'root'
})
export class DesignTacoService {

  private apirUrl: string = 'http://localhost:8080/design/taco';

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

  getIngredientsGroupedByType(): Observable<any> {
    return this.http.get(this.apirUrl, this.httpOptions());
  }

  createTacoFromIngredients(taco: Taco): Observable<any> {
    return this.http.post(this.apirUrl, taco, this.httpOptions());
  }

}
