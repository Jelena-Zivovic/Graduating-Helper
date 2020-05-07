import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'learn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  loginHeader(data) {
    console.log(data)
  }

}
