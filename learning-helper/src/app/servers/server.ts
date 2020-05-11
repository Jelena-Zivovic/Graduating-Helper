import { User } from './user';

export class Server {

    
    users: User[] = [];
    loggedInUserId: number;

    constructor() {
        
        
    }

    checkIfUserIsRegistered(user) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === user.username && this.users[i].password === user.password) {
                return true;
            }
        }

        return false;
    }

    registerUser(user : {firstName: string, lastName: string, username: string, email: string, password: string}) {
       if (!this.checkIfUserIsRegistered(user)) {
            let newId = this.users.length == 0 ? 1 : this.users[this.users.length-1].id + 1;
            this.users.push(new User(
                newId,
                user.firstName,
                user.lastName,
                user.username,
                user.email,
                user.password
            ));
            
       }
        
    }

    signIn(user: {username: string, password: string}) {
        if (this.checkIfUserIsRegistered(user)) {
            for (let i = 0; i < this.users.length; i++) {
                if (this.users[i].username === user.username) {
                    this.loggedInUserId = this.users[i].id;
                    localStorage.setItem("currentUser", user.username);
                    break;
                }
            }
            
        }
    }

    logOut() {
        this.loggedInUserId = 0;
        localStorage.removeItem("currentUser");
    }

    currentUser() {
        return localStorage.getItem("currentUser");
    }

    getUserInfo(username: string) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].username === username) {
                return this.users[i];
            }
        }
        return {};
    }

    getAllUsers() {
        return this.users;
    }
    

    printUsers() {
        for (let i = 0; i < this.users.length; i++) {
            console.log(this.users[i]);
        }
    }


}



