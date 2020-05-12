import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import * as data from '../../assets/quotes.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataGeneratorService {

  //quotes = [];
  private url = 'https://type.fit/api/quotes';
  private options = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };
  private quotes;

  constructor(private http: HttpClient) {
    
    
  }

  getQuotesFromServer() {
    this.http.get(this.url, this.options)
      .subscribe(response => {
        this.quotes = response;
      });
  }

  getQuotes() {
    return this.quotes;
  }

  getRandomQuote() {
    let randomId = Math.floor(Math.random()*9) + 1;
    let chosenQuote = this.quotes[randomId];
    console.log(chosenQuote);
    return {quote: chosenQuote.text, author: chosenQuote.author};


  }
}
