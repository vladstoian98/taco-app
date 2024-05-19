import { Component } from '@angular/core';
import { AccountDetailsService } from 'src/app/service/account-details-service/account-details.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login-service/login.service';

@Component({
  selector: 'app-account-details-component',
  templateUrl: './account-details-component.html',
  styleUrls: ['./account-details-component.scss']
})
export class AccountDetailsComponentComponent {
  oldUsername: string | null = null;

  newUsername: string | null = null;

  oldPassword: string | null = null;

  newPassword: string | null = null;

  errorMessageUsername: string | null = null;

  errorMessagePassword: string | null = null;

  constructor(private accountDetailsService: AccountDetailsService, private loginService: LoginService, private router: Router) {}

  changePassword(): void {
    if(this.oldPassword != null && this.newPassword != null) {
      this.accountDetailsService.changePassword(this.oldPassword, this.newPassword).subscribe({
        next: (data) => {
          console.log("You have successfully changed your password.");
          this.loginService.logout();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error("Error while changing password: ", error);
          this.errorMessagePassword = "Please review your password inputs";
        }
      });
    }

    
  }

  changeUsername(): void {
    if(this.oldUsername != null && this.newUsername != null) {
      this.accountDetailsService.changeUsername(this.oldUsername, this.newUsername).subscribe({
        next: (response) => {
          console.log("You have successfully changed your username", response.data); // Accessing data property
          this.loginService.logout();
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error("Error while changing username: ", error);
          this.errorMessageUsername = "Please review your username inputs";
        }
      });      
    }
  }
}
