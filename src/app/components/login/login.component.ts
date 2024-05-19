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
          // Save JWT to localStorage or a similar place where you can access it later
          localStorage.setItem('jwt', data.jwt);
          // Possibly redirect the user to a different page now
          this.router.navigate(['/home']);
        } else {
          // The server responded successfully, but did not provide a token. This is unexpected.
          console.error('Server did not provide a token.');
        }
      },
      error => {
        console.error(error);
        // Handle error response here, like displaying a message to the user
        if (error.status === 401) {
          // The server responded with 'Unauthorized'. The username or password were incorrect.
          this.loginError = 'Invalid username or password.';  
        } else {
          // Some other error occurred.
          this.loginError = 'Invalid username or password.';
        }
      }
    );
  }
}