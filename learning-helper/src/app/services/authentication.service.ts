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
      console.log("user: " + user.username + " is logged in.");
    }
  }



}
