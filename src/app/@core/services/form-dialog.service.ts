import { Injectable } from '@angular/core';
import { ContComponent } from '../models/cont-component';
import { LeaderFormComponent, HotbedNameFormComponent } from '../../@theme/components';
import { Validators } from '@angular/forms';

const ALL_FORMS = {
    name: {
        ...new ContComponent(HotbedNameFormComponent, {
            form: {
                name: [null, Validators.required],
                acronym: [null, Validators.required],
            },
        },
            {
                autoFocus: true,
            }),
    },
    leader: {
        ...new ContComponent(LeaderFormComponent, {
            title: 'Lider del Semillero de Investigacion',
        }),
    },
    co_leader: {
        ...new ContComponent(LeaderFormComponent, {
            title: 'Formulario del Co-lider del Semillero',
        }),
    },
};

@Injectable({
    providedIn: 'root',
})
export class FormDialogService {
    private cont = ALL_FORMS;

    forms(index?: string) {
        if (index) return this.cont[index] || null;

        return this.cont;
    }
}
