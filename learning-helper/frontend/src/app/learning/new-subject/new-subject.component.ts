import { ExamDateValidators } from './exam-date.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'learn-new-subject',
  templateUrl: './new-subject.component.html',
  styleUrls: ['./new-subject.component.css']
})
export class NewSubjectComponent implements OnInit {

  basicInfoGroup = new FormGroup({
    subjectName: new FormControl('', [Validators.required]),
    examDate: new FormControl('', [Validators.required, ExamDateValidators.validDate])
  });

  complexityGroup = new FormGroup({
    typeOfExam: new FormControl('', [Validators.required]),
    complexityLevel: new FormControl('', [Validators.required])
  });

  materialInfoGroup = new FormGroup({
    materialType: new FormControl('', [Validators.required]),
    quantityOfMaterial: new FormControl('', [Validators.required])
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

  getMaterialType() {
    return this.form.get('materialInfoGroup').get('materialType').value;
  }

  checkExamDate() {
    let examDate = new Date(this.form.get('basicInfoGroup').get('examDate').value);
    let now = new Date();
    return now < examDate;
  }

  isFormCorrect() {
    return !this.form.get('basicInfoGroup').invalid &&
            !this.form.get('complexityGroup').invalid &&
            !this.form.get('materialInfoGroup').invalid;
  }

  submit() {
    if (!this.isFormCorrect()) {
      console.log('form is invalid');
    }
    else {
      console.log('form is valid');
    }
    

  }

}
