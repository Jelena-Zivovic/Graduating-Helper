import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'learn-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css']
})
export class NewSubjectComponent implements OnInit {

  basicInfoGroup = new FormGroup({
    subjectName: new FormControl(),
    examDate: new FormControl()
  });

  complexityGroup = new FormGroup({
    typeOfExam: new FormControl(),
    complexityLevel: new FormControl()
  });

  materialInfoGroup = new FormGroup({
    materialType: new FormControl()
  });

  form = new FormGroup({
    basicInfoGroup: this.basicInfoGroup,
    complexityGroup: this.complexityGroup,
    materialInfoGroup: this.materialInfoGroup
  });

  constructor() {
    
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.form.get('basicInfoGroup').get('subjectName').value);
    console.log(this.form.get('basicInfoGroup').get('examDate').value);

  }

}
