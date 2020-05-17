import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Subject {
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
}
