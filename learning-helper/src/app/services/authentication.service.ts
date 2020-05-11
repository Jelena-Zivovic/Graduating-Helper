import { Server } from './../servers/server';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  server: Server;

  constructor() {
    this.server = new Server();
  }

  login(user: {username: string, password: string}) {
    if (this.server.checkIfUserIsRegistered(user)) {
      this.server.signIn(user);
    }
  }

  register(user: {firstName: string, lastName: string, username: string, email: string, password: string}) {
    this.server.registerUser(user);
    console.log("registrovan!");
    this.server.printUsers();
  }

  isUserLoggedIn() {
    return this.server.loggedInUserId !== 0;
  }

  getCurrentUserUsername() {
    return this.server.currentUser();
  }

  logout() {
    
    this.server.logOut();
  }

  getUserInfo(username: string) {
    return this.server.getUserInfo(username);
  }

  getAllRegisteredUsers() {
    return this.server.getAllUsers();
  }

}
