import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Subject {
  id: number,
  subjectName: string,
  examDate: string,
  typeOfExam: string,
  complexityLevel: string,
  materialType: string,
  quantityOfMaterial: number
};

@Injectable({
  providedIn: 'root'
})
export class OrganizerService {

  constructor(private http: HttpClient) { }

  addSubjectForUser(username, subject) {
    return this.http.post('http://localhost:3000/api/subjects/' + username, subject);
  }

  getUserSubjects(username) {
    return this.http.get('http://localhost:3000/api/subjects/' + username);
  }

  calculateDaysUntilExam(examDate) {
    let exam = new Date(examDate);
    let now = new Date();
    return Math.floor((exam.getTime() - now.getTime()) / (24*60*60*1000));
  }
}
