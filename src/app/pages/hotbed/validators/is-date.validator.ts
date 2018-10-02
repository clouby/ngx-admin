import { AbstractControl } from '@angular/forms';

export class ValidatorDate {
    // Validate date
    private static validateDate = (value) => {
        return value && !(value instanceof Date);
    }
    static isDate(control: AbstractControl): { [key: string]: boolean } | null {
        if (ValidatorDate.validateDate(control.value)) {
            return { 'isDate': true };
        }
        return null;
    }
}

