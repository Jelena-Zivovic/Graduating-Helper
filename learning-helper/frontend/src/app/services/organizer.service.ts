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

    console.log(subject);

    let daysForPreparing = daysUntilExam - daysForRepeating;
    let materialLeft = subject.quantityOfMaterial - subject.progress;

    if (subject.materialType === 'book') {
      return {
        id: subject.id,
        materialType: subject.materialType,
        quantity: Math.ceil(materialLeft / daysForPreparing),
        daysForRepeating: daysForRepeating
      }
    }
    else {

      let q = Math.floor(materialLeft / daysForPreparing);
      if (q === 0) {
        console.log("bla");
        return {
          id: subject.id,
          materialType: subject.materialType,
          quantity: 1,
          daysForRepeating: daysForRepeating +  (daysForPreparing - materialLeft)
        }
      }
      else {
        return {
          id: subject.id,
          materialType: subject.materialType,
          quantity: Math.ceil(materialLeft / daysForPreparing),
          daysForRepeating: daysForRepeating
        }

      }
    }
  }

  getSubject(id: number) {
    return this.http.get('http://localhost:3000/api/subjects/' 
            + localStorage.getItem('username') + "/" + id.toString());
  }

}
