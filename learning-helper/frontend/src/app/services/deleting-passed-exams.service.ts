import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeletingPassedExamsService {

  private subjectsAndExamsToDelete = new BehaviorSubject([]);
  subjectsIds = this.subjectsAndExamsToDelete.asObservable();

  constructor() { }
}
