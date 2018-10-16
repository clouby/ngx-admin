import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineService } from '../../../@core/services/line.service';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { ValidatorDate } from '../validators/is-date.validator';
import { PushAlertService } from '../../../@core/services';
import { map, mergeMap, scan } from 'rxjs/operators';
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
    // Handle events for dateChange from NbCalendar
    select: EventEmitter<Date> = new EventEmitter<Date>();

    // Loading Behavior
    loading: BehaviorSubject<boolean>;

    lineResearch: Array<Lines> = [];
    trainingCenter: Lines[] = [];

    // Catch control errors for display error styles.
    catchStyleError: any;

    magnolia: any = {};

    // Bind data from NbCalendar
    selDate: Date = null;

    // Show datepicker
    showDate: boolean = false;

    // Form for Create Hotbed
    hotbedForm: FormGroup;

    constructor(private fb: FormBuilder, private ls: LineService, private pas: PushAlertService) { }

    ngOnInit() {
        // Init form for create hotbed
        this.hotbedForm = this.initHotbedForm;
        // Init the line handlers
        this.handlerErrorPromises(this.initLine.bind(this));

        this.classErrors(this.hotbedForm).subscribe(data => {
            this.magnolia = data;
        });
    }

    handlerErrorPromises(fn, params?: Array<any>): Promise<any> {
        return fn(...params).catch(this.disablePropsByError(this.hotbedForm));
    }

    disablePropsByError(form: FormGroup, typeAlert: string = 'warning') {
        return ({ message, fields = [] }) => {
            if (fields.length) {
                fields.forEach(control => {
                    form.get(control).disable();
                });
            }
            this.pas[typeAlert](message);
        };
    }

    get toggleShowDate(): boolean {
        return this.showDate = !this.showDate;
    }

    test() {
        this.pas.success('Hola madapaka!');
    }

    testError() {
        this.pas.error('Error madapaka!');
    }


    containerPaus(object): Object {
        return object;
    }

    // TODO: Testing...
    private classErrors(form: FormGroup): Observable<any> {
        return form.valueChanges.pipe(
            mergeMap(fields => from(Object.keys(fields))),
            map(field => {
                const control = form.get(field);
                return {
                    [field]: {
                        'form-control-success': control.dirty && !control.invalid,
                        'form-control-danger': !!control.errors && control.dirty,
                    },
                    index: field,
                };
            }),
            map(field => {
                return {
                    [field.index]: Object.keys(field[field.index]).filter(val => field[field.index][val]),
                };
            }),
            scan((acc, current) => ({ ...acc, ...current }), {}),
        );
    }

    private async initLine() {
        // Behavior from `loading` property from LineService
        this.sLoading();

        // Change status with Date values
        this.handleDateChange('official_date');

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

    private handleDateChange(field): void {
        this.select.subscribe((date: Date) => this.toggleShowDate || this.hotbedForm.get(field).setValue(date));
    }

    private get initHotbedForm(): FormGroup {
        return this.fb.group({
            name: [null, Validators.required],
            official_date: [null, [Validators.required, ValidatorDate.isNotDate]],
            line_research: [null, Validators.required],
            training_center: [null, Validators.required],
            leader: [null, Validators.required],
            co_leader: [null, Validators.required],
        });
    }

}
