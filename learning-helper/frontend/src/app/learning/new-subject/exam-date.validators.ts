import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ExamDateValidators {

    static isExamDateValid = false;

    static validDate(control: AbstractControl) : ValidationErrors | null {
        let now = new Date();
        let examDate = new Date((control.value as string));

        if (examDate < now) {
            ExamDateValidators.isExamDateValid = false;
            return {validDate: true};
        }
        ExamDateValidators.isExamDateValid = true;
        return null;
    }
}