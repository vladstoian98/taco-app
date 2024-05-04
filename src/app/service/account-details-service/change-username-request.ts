export class ChangeUsernameDetails {
    private oldUsername: string | null = null;

    private newUsername: string | null = null;

    constructor(oldUsername: string, newUsername: string) {
        this.oldUsername = oldUsername;
        this.newUsername = newUsername;
    }

}