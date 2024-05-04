export class ChangePasswordDetails {
    private oldPassword: string | null = null;

    private newPassword: string | null = null;

    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

}