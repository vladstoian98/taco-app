import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationForm } from 'src/app/components/register/registration-form';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = 'http://localhost:8080/register';

  constructor(private httpClient : HttpClient) { }

  registerUser(formData: RegistrationForm): Observable<any> {
    return this.httpClient.post<any>(this.baseURL, formData);
  }
}
