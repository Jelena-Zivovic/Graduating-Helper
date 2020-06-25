import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'learn-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link; 
  @Input() chosenActivity;

  isItChecked: boolean = false;
  url: string;


  constructor() { }

  ngOnInit(): void {
  }

  setUrl() {
    if (this.link === "music") {
      this.url = "https://www.accuradio.com/rock";
    }
    else {
      this.url = "https://lagged.com";
    }
  }

  getUrl() {
    
    if (this.link === "music") {
      this.url = "https://www.accuradio.com/rock";
    }
    else {
      this.url = "https://lagged.com";
    }
  }

  setCheckedStatus() {
    this.isItChecked = !this.isItChecked;
  }

  setNewUrl(category) {

    let categories = {
      rock: "https://www.accuradio.com/rock/",
      metal: "https://www.accuradio.com/heavy-metal/",
      classic: "https://www.accuradio.com/classical/",
      chill: "https://www.accuradio.com/chill/",
      blues: "https://www.accuradio.com/blues/",
      jazz: "https://www.accuradio.com/jazz/",
      sport: "https://lagged.com/en/sports",
      brain: "https://lagged.com/en/brain",
      arcade: "https://lagged.com/en/arcade",
      fidgetSpinner: "https://lagged.com/en/fidget-spinner"
    };

    let a = document.getElementById("linkClick");
    a.setAttribute('href', categories[category]);
  }

 

  

}
