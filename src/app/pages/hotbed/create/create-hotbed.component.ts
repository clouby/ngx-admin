import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineService } from '../../../@core/services/line.service';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { ValidatorDate } from '../validators/is-date.validator';
import { PushAlertService } from '../../../@core/services';
import { map, mergeMap, scan } from 'rxjs/operators';
import { NbDialogService } from '@nebular/theme';
import { LeaderFormComponent } from '../../../@theme/components';
import { HotbedName } from '../../../@core/models/hotbed-name';

interface Lines {
    _id: string;
    name: string;
}

@Component({
    selector: 'ngx-create-hotbed',
    styleUrls: ['./create-hotbed.component.scss'],
    templateUrl: './create-hotbed.component.html',
})
export class CreateHotbedComponent implements OnInit {

    // Loading Behavior
    loading: BehaviorSubject<boolean>;

    // Get data from endpoint for { line_research  && training_center }
    lineResearch: Array<Lines> = [];
    trainingCenter: Lines[] = [];

    // Catch control errors for display error styles.
    styleControlClass: any = {};

    // Form for Create Hotbed
    hotbedForm: FormGroup;

    constructor(private fb: FormBuilder,
        private ls: LineService,
        private pas: PushAlertService,
        private ds: NbDialogService) { }

    ngOnInit() {
        // Init form for create hotbed
        this.hotbedForm = this.initHotbedForm;
        // Init process for handle errors
        this.handlerErrorPromises(this.initLine.bind(this));
        // Catch errors for form's field.
        this.classErrors(this.hotbedForm, fields => this.styleControlClass = fields);
    }

    onResultName(name: HotbedName) {
        this.applyFormFields(name);
    }

    handlerErrorPromises(fn, params?: Array<any>): Promise<any> {
        return fn(...params).catch(this.disablePropsByError(this.hotbedForm));
    }

    get openDiag() {
        return true;
    }

    test() {
        // this.pas.success('Hola madapaka!');
        this.ds.open(LeaderFormComponent);
    }

    testError() {
        this.pas.error('Error madapaka!');
    }

    private applyFormFields(container: object) {
        this.hotbedForm.patchValue({
            ...container,
        });
    }

    private disablePropsByError(form: FormGroup, typeAlert: string = 'warning') {
        return ({ message, fields = [] }) => {
            if (fields.length) {
                fields.forEach(control => {
                    form.get(control).disable();
                });
            }
            this.pas[typeAlert](message);
        };
    }

    private classErrors(form: FormGroup, cb): Subscription {
        return form.valueChanges.pipe(
            mergeMap(fields => from(Object.keys(fields))),
            map(field => {
                const control = form.get(field);
                const [success, danger] = [control.dirty && !control.invalid, !!control.errors && control.dirty];
                return {
                    [field]: {
                        'form-control-success': success,
                        'form-control-danger': danger,
                    },
                    index: field,
                };
            }),
            map(field => ({
                [field.index]: Object.keys(field[field.index]).filter(val => field[field.index][val]),
            })),
            scan((acc, current) => ({ ...acc, ...current }), {}),
        ).subscribe(cb);
    }

    private async initLine() {
        // Behavior of `loading` property from LineService
        this.sLoading();

        // Get Line Research and Training Centers
        const { LINE_RESEARCH, TRAINING_CENTER } = await this.ls.all;

        // Assign inline variables about linesResource.
        [this.lineResearch, this.trainingCenter] = [LINE_RESEARCH, TRAINING_CENTER];

        // Patch by default values for ´lineResearch´ and ´trainingCenter´
        this.hotbedForm.patchValue({
            line_research: this.lineResearch[0],
            training_center: this.trainingCenter[0],
        });
    }

    private sLoading(): void {
        this.loading = this.ls.g_loading;
    }

    private get initHotbedForm(): FormGroup {
        return this.fb.group({
            name: [null, Validators.required],
            acronym: [null, Validators.required],
            official_date: [null, [Validators.required, ValidatorDate.isNotDate]],
            line_research: [null, Validators.required],
            training_center: [null, Validators.required],
            leader: [null, Validators.required],
            co_leader: [null, Validators.required],
        });
    }

}
