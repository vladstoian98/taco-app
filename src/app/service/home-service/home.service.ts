import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private homeUrl = 'http://localhost:8080/home';

  constructor(private http : HttpClient) { }

  getHomePageMessage(): Observable<string> {
    return this.http.get<string>(this.homeUrl);
  }
}
