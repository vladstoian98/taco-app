import { Component, OnInit } from '@angular/core';
import { LoginUser } from './login-user';
import { LoginService } from 'src/app/service/login-service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss']
})
export class LoginComponent implements OnInit {
  user: LoginUser = new LoginUser();
  loginError: string = '';

  constructor(private loginService: LoginService, private router : Router) { }

  ngOnInit() {
  }

  login(): void {
    this.loginService.login(this.user).subscribe(
      data => {
        console.log(data);
        if (data.jwt) {
          console.log("Successful login!!!")
          localStorage.setItem('jwt', data.jwt);
          this.router.navigate(['/home']);
        } else {
          console.error('Server did not provide a token.');
        }
      },
      error => {
        console.error(error);
        if (error.status === 401) {
          this.loginError = 'Invalid username or password.';  
        } else {
          this.loginError = 'Invalid username or password.';
        }
      }
    );
  }
}