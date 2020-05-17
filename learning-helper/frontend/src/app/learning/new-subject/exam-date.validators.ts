import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ExamDateValidators {
    static validDate(control: AbstractControl) : ValidationErrors | null {
        let now = new Date();
        let examDate = new Date((control.value as string));

        if (examDate < now) {
            return {validDate: true};
        }
        return null;
    }
}