import { AuthenticationService } from './../services/authentication.service';
import { DataGeneratorService } from './../services/data-generator.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'learn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  displayedQuote;
  private quotes ;

  constructor(private generator: DataGeneratorService,
              private authService: AuthenticationService,
              private router: Router) {
    
    this.displayedQuote = {
      quote: "You don't have to be great to start, but you have to start to be great.",
      author: "Zig Ziglar"
    }
  }

  ngOnInit(): void {
    this.generator.getQuotesFromServer();
  }

  isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  userIsReadyForLearning() {
    this.router.navigate(['/learning']);
  }

  setDisplayedQuote() {
    this.quotes = this.generator.getQuotes();
    let randomIndex = Math.floor(Math.random() * this.quotes.length) + 1;
    let chosenQuote = this.quotes[randomIndex];
    this.displayedQuote = {
      quote: chosenQuote.text,
      author: chosenQuote.author
    };
  }
}
