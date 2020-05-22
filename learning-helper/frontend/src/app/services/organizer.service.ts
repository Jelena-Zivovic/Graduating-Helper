import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Subject {
  id: number,
  subjectName: string,
  examDate: string,
  typeOfExam: string,
  complexityLevel: string,
  materialType: string,
  quantityOfMaterial: number,
  progress: number
};

export interface Plan {
  date: string,
  id: number,
  subjectName: string,
  materialForToday: number,
  materialType: string,
  typeOfExam: string,
  daysForRepeating: number
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

  updateSubject(username, id, progress) {
    return this.http.put('http://localhost:3000/api/subjects/' + username, {id: id, progress: progress});
  }

  organizeSubjectForToday(subject) {
    let daysUntilExam = this.calculateDaysUntilExam(subject.examDate);
    let daysForRepeating = 0;
    if (subject.complexityLevel === 'easy') {
      daysForRepeating = 2;
    }
    else if (subject.complexityLevel === 'hard') {
      daysForRepeating = 4;
    }
    else {
      daysForRepeating = 3;
    }

    let daysForPreparing = daysUntilExam - daysForRepeating;
    let materialLeft = subject.quantityOfMaterial - subject.progress;

    if (subject.materialType === 'book') {
      return {
        id: subject.id,
        subjectName: subject.subjectName,
        materialForToday: Math.ceil(materialLeft / daysForPreparing),
        materialType: subject.materialType,
        typeOfExam: subject.typeOfExam,
        daysForRepeating: daysForRepeating
      }
    }
    else {

      let q = Math.floor(materialLeft / daysForPreparing);
      if (q === 0) {
        return {
          id: subject.id,
          subjectName: subject.subjectName,
          materialForToday: 1,
          materialType: subject.materialType,
          typeOfExam: subject.typeOfExam,
          daysForRepeating: daysForRepeating +  (daysForPreparing - materialLeft)
        }
      }
      else {
        return {
          id: subject.id,
          subjectName: subject.subjectName,
          materialForToday: Math.ceil(materialLeft / daysForPreparing),
          materialType: subject.materialType,
          typeOfExam: subject.typeOfExam,
          daysForRepeating: daysForRepeating
        }

      }
    }
  }

  getSubject(id: number) {
    return this.http.get('http://localhost:3000/api/subjects/' 
            + localStorage.getItem('username') + "/" + id.toString());
  }

  getUserPlan(username) {
    return this.http.get('http://localhost:3000/api/plans/' + username);
  }

  addPlan(username, plan) {
    return this.http.post('http://localhost:3000/api/plans/' + username, plan);
  }

  deletePlans(username) {
    return this.http.delete('http://localhost:3000/api/plans/' + username);
  }



}
