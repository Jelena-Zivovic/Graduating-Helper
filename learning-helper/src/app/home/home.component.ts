import { DataGeneratorService } from './../services/data-generator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  randomQuote;

  constructor(private generator: DataGeneratorService) {
    this.randomQuote = this.getQuote();
  }

  ngOnInit(): void {
  }

  getQuote() {

    return this.generator.getRandomQuote();
  }

  setNewQuote() {
    this.randomQuote = this.getQuote();
  }
  

}
