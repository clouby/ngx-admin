import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'phone' })
export class MobilePhonePipe implements PipeTransform {

    private setIndex = (index: string): string => `(${index})`;

    private setNumber = (number: string): string => `${number.slice(0, 3)}-${number.slice(3)}`;

    private isNotIntNumber(value: any) {
        return Number.isNaN(Number(value));
    }

    transform(phone_number: string) {
        if (!phone_number || this.isNotIntNumber(phone_number)) return phone_number;

        // Convert to string to use function from `String`
        const phone = phone_number.toString().trim();
        let index, number;

        // Phone number must get the index and number
        switch (phone.length) {
            case 10:
                index = this.setIndex(phone.slice(0, 3));
                number = this.setNumber(phone.slice(3));
                return [index, number].join(' ');

            default:
                return phone;
        }
    }
}
