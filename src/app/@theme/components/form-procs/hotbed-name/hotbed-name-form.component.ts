import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HotbedName } from '../../../../@core/models/hotbed-name';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'ngx-hotbed-name-form',
    templateUrl: './hotbed-name-form.component.html',
    styleUrls: ['./hotbed-name-form.component.scss'],
})
export class HotbedNameFormComponent implements OnInit, AfterContentInit {
    @Input() name: string;

    model: HotbedName;

    constructor(private dr: NbDialogRef<HotbedNameFormComponent>) { }

    ngOnInit() {
        this.model = new HotbedName(this.name);
        this.defaultChanges(this.model);
    }

    ngAfterContentInit() {
    }

    onChanges(val) {
        this.becomeAcronym(this.model, val);
    }

    onSubmit(form: NgForm) {
        // if (form.valid) {
        this.submit(this.model);
        // }
    }

    private defaultChanges(ref: HotbedName) {
        if (!ref.name.trim()) return;
        this.becomeAcronym(ref, ref.name);
    }

    private becomeAcronym(ref: HotbedName, val: string, field: string = 'acronym') {
        if (!val) return ref[field] = '';

        const new_acronym = val.match(/^[A-Z]|\b[A-Z]/g);

        ref[field] = !new_acronym ? '' : new_acronym.join('');
    }

    private submit(data) {
        this.dr.close(data);
    }
}
