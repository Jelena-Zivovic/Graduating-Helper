export class Server {
    users: {id: number, username: string, password: string}[] = [];

    constructor() {
        
        
    }

    checkIfUserIsRegistered(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === user.username) {
                return true;
            }
        }

        return false;
    }

    registerUser(user : {username: string, password: string}) {
        if (!this.checkIfUserIsRegistered(user)) {
            this.users.push({
                id: this.users.length > 0 ? this.users[this.users.length-1].id + 1 : 1,
                username: user.username,
                password: user.password
            });
        }
        
    }

    printUsers() {
        for (let i = 0; i < this.users.length; i++) {
            console.log(this.users[i]);
        }
    }


}


