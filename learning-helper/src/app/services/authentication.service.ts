import { HttpClient } from '@angular/common/http';
import { Server } from './../servers/server';
import { Injectable } from '@angular/core';
import {server} from '../../../../backend/server.js';
import { Observable } from 'rxjs';

export interface User {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  server: Server;

  constructor(private http: HttpClient) {
    this.server = new Server();
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/users');
  }

  login(user: {username: string, password: string}) : Observable<User> {
    //from here
    return this.http.get<User>('http://localhost:3000/api/users/' + user.username);
  }

  register(user: {firstName: string, lastName: string, username: string, email: string, password: string}) : Observable<User>{
    this.server.registerUser(user);
    return this.http.post<User>('http://localhost:3000/api/users', user);
  }

  isUserLoggedIn() {
    if (localStorage.length === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  getCurrentUserUsername() {
    return localStorage.getItem('username');
  }

  logout() {
    localStorage.clear();
    this.server.logOut();
  }

  getUserInfo(username: string) {
    return this.server.getUserInfo(username);
  }

  getAllRegisteredUsers() {
    return this.server.getAllUsers();
  }

}
