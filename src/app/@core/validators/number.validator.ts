import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class NumberValidator {

    static equalLength(val: number): ValidatorFn {
        return function (control: AbstractControl): ValidationErrors | null {
            const { value } = control;

            if (value && (value.length !== val)) return { notEqual: true };

            return null;
        };
    }

    static isNumber(control: AbstractControl): ValidationErrors | null {
        const { value } = control;

        if (value && Number.isNaN(Number(value))) return { isNotNumber: true };

        return null;
    }
}
