import { Injectable } from '@angular/core';
import { ContComponent } from '../models/cont-component';
import { LeaderFormComponent, HotbedNameFormComponent } from '../../@theme/components';
import { Validators, FormBuilder } from '@angular/forms';
import { NumberValidator } from '../validators/number.validator';

@Injectable({
    providedIn: 'root',
})
export class FormDialogService {

    // Basic form for User Model
    private USER_BASE_FORM = {
        _id: [],
        name: this.fb.group({
            first: [null, Validators.required],
            last: [null, Validators.required],
        }),
        email: [null, [Validators.required, Validators.email]],
        mobile_phone: [null, [Validators.required, Validators.compose([NumberValidator.isNumber, NumberValidator.equalLength(10)])]],
        role: [null, [Validators.required]],
    };

    // Include all forms of the application
    private ALL_FORMS = {
        name: new ContComponent(HotbedNameFormComponent, {
            form: {
                name: [null, Validators.required],
                acronym: [null, Validators.required],
            },
        },
            {
                autoFocus: true,
            }),
        leader: new ContComponent(LeaderFormComponent, {
            data: {
                title: 'Instructor Líder',
            },
            form: {
                ...this.USER_BASE_FORM,
            },
        }, {
                autoFocus: false,
            }),
        co_leader: new ContComponent(LeaderFormComponent, {
            data: {
                title: 'Instructor Co-líder',
            },
            form: {
                ...this.USER_BASE_FORM,
            },
        }),
        coor_novice: new ContComponent(LeaderFormComponent, {
            data: {
                title: 'Formulario del Coordinador',
            },
            form: {
                ...this.USER_BASE_FORM,
            },
        }),
    };

    constructor(private fb: FormBuilder) { }

    forms(index?: string): ContComponent | { [key: string]: ContComponent } {
        if (index) return this.ALL_FORMS[index] || null;
        return this.ALL_FORMS;
    }
}
