import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'learn-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoriesMusic = ["rock", "metal", "classic", "chill", "blues", "jazz"];
  categoriesGames = ["sport", "brain", "arcade", "fidgetSpinner"];

  @Input() typeOfActivity: string;
  @Output() categoryIsChosen : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendChosenCategory(event) {
    let chosen = event.srcElement.textContent.trim();
    this.categoryIsChosen.emit(chosen);
  }

}
