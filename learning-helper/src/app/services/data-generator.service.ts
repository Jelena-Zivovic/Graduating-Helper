import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  constructor() { }

  getRandomQuote() {
    let randomId = Math.floor(Math.random()*9) + 1;

  }
}
