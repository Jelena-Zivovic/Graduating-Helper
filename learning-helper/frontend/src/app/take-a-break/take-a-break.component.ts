import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'learn-take-a-break',
  templateUrl: './take-a-break.component.html',
  styleUrls: ['./take-a-break.component.css']
})
export class TakeABreakComponent implements OnInit {

  typeOfActivity: string = "";
  isActivityChosen: boolean = false;
  message: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  playGame() {
    this.typeOfActivity = "game";
    this.isActivityChosen = true;
  }

  listenMusic() {
    this.typeOfActivity = "music";
    this.isActivityChosen = true;
  }


  



}
