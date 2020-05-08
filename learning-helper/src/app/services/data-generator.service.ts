import { Injectable } from '@angular/core';

import * as data from '../../assets/quotes.json';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  quotes = [];

  constructor() {
    this.quotes = (data as any).default; 
    
  }

  getRandomQuote() {
    let randomId = Math.floor(Math.random()*9) + 1;
    let chosenQuote = this.quotes[randomId];
    return {quote: chosenQuote.quote, author: chosenQuote.author};

  }
}
