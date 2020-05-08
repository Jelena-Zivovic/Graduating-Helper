export class User {

    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;

    constructor(id, fName, lName, uName, email, pass) {
        this.id = id;
        this.firstName = fName;
        this.lastName = lName;
        this.username = uName;
        this.email = email;
        this.password = pass;
    }

    getFirstName() {
        return this.firstName;
    }

    getLastName() {
        return this.lastName;
    }

    getEmail() {
        return this.email;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }

    setFirstName(fName: string) {
        this.firstName = fName;
    }

    setLastName(lName: string) {
        this.lastName = lName;
    }

    setUsername(username: string) {
        this.username = username;
    }

    setEmail(email: string) {
        this.email = email;
    }

    setPassword(pass: string) {
        this.password = pass;
    }



}