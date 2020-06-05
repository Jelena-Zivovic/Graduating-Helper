import { AuthenticationService } from './../../services/authentication.service';
import { FormGroup, FormControl, FormsModule } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'learn-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.css']
})
export class ChangeUserInfoComponent implements OnInit {

  @Input() indicator: boolean = false;
  @Output() dataChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  changeDataForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    password: new FormControl(),
    repeatedPassword: new FormControl()
  });

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

   change(data) {
    

    this.dataChanged.emit(true);
    
  }

 
 

}
