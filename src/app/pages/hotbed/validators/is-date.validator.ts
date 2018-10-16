import { AbstractControl } from '@angular/forms';

export class ValidatorDate {
    // Validate date
    private static validateDate = (value) => {
        return value && !(value instanceof Date);
    }
    static isNotDate(control: AbstractControl): { [key: string]: boolean } | null {
        if (ValidatorDate.validateDate(control.value)) {
            return { 'isNotDate': true };
        }
        return null;
    }
}

