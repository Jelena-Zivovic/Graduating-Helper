import { Router } from '@angular/router';
import { ExamDateValidators } from './exam-date.validators';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganizerService } from 'src/app/services/organizer.service';

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

  constructor(private router: Router, 
              private organizerService: OrganizerService) { }

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
            !this.form.get('materialInfoGroup').invalid &&
            ExamDateValidators.isExamDateValid;
  }

  submit() {
    let subject = {
      subjectName: this.form.get('basicInfoGroup')
                            .get('subjectName')
                            .value,
      examDate: this.form.get('basicInfoGroup')
                         .get('examDate')
                         .value,
      typeOfExam: this.form.get('complexityGroup')
                           .get('typeOfExam')
                           .value,
      complexityLevel: this.form.get('complexityGroup')
                                .get('complexityLevel')
                                .value,
      materialType: this.form.get('materialInfoGroup')
                             .get('materialType')
                             .value,
      quantityOfMaterial: this.form.get('materialInfoGroup')
                                   .get('quantityOfMaterial')
                                   .value

    };
    this.organizerService.addSubjectForUser(localStorage.getItem('username'), subject).subscribe(ret => {
      
      if (ret === null) {
        alert('Subject already exists.');
      }
      else {
        console.log('Subject is entered.');
        this.form.reset();
        //needs fixing, just reloading component
        window.location.reload();
        

      }

      
      

    });
  }
}
