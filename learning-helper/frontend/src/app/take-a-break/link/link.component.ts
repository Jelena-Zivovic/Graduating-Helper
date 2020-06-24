import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'learn-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link; 
  @Input() chosenActivity;


  constructor() { }

  ngOnInit(): void {
  }

  getUrl() {
    if (this.link === "music") {
      return "https://www.accuradio.com/rock";
    }
    else {
      return "https://lagged.com";
    }
  }

  

}
