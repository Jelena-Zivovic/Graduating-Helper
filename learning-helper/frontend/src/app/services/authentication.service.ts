import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api/users');
  }

  login(user: {username: string, password: string}) : Observable<User> {
    //from here
    return this.http.get<User>('http://localhost:3000/api/users/' + user.username);
  }

  register(user: {firstName: string, lastName: string, username: string, email: string, password: string}) : Observable<User>{
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
  }

  getUserInfo(username: string) {
    return this.http.get<User>('http://localhost:3000/api/users/' + username);
  }

  updateUserInfo(username, newInfo) {
    return this.http.put('http://localhost:3000/api/users/' + username, newInfo);
  }

  deleteUser(username) {
    this.logout();
    return this.http.delete('http://localhost:3000/api/users/' + username);
  }


}
