import { Component } from '@angular/core';
import { User } from 'src/app/tables/user';
import { AdminUserModerationService } from 'src/app/service/admin-user-moderation-service/admin-user-moderation.service';

@Component({
  selector: 'app-admin-user-moderation-component',
  templateUrl: './admin-user-moderation-component.html',
  styleUrls: ['./admin-user-moderation-component.scss']
})
export class AdminUserModerationComponent {

  selectedUser: User | null = null;

  insertedUsername: string = "";

  selectUserError: string | null = null;

  constructor(private adminUserModerationService: AdminUserModerationService) {}

  getUserByUsername(): void {
    this.adminUserModerationService.getUserForModeration(this.insertedUsername).subscribe({
      next: (response) => {
        console.log("getCustomerUsers response: ", response.user);
        if(response.user.authority != "admin") {
          this.selectedUser = response.user;
          this.selectUserError = null;
        } else {
          this.selectUserError = "Could not select user. Please try again."
          this.selectedUser = null;
        }
      },
      error: (error) => {
        console.log("Error while getting customer users: ", error);
        this.selectedUser = null;
        this.selectUserError = "Could not select user. Please try again."
        this.selectedUser = null;
      }
    });
  }

  deleteSelectedUser(username: string | null): void {
    if(username != null) {
      this.adminUserModerationService.deleteSelectedUser(username).subscribe({
        next: (response) => {
          console.log("User deletion success");
          this.selectedUser = null;
        },
        error: (error) => {
          console.error("Error while trying to delete user");
        }
      });
    }
  }
  
}
