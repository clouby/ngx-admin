import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineService } from '../../../@core/services/line.service';
import { BehaviorSubject } from 'rxjs';
import { ValidatorDate } from '../validators/is-date.validator';
import { PushAlertService } from '../../../@core/services';
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

    // TODO: Get line research from API.
    lineResearch: Array<Lines> = [];
    trainingCenter: Lines[] = [];

    // Bind data for NbCalendar
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
        this.handlerErrorPromises(this.initLine);
    }

    handlerErrorPromises(fn, ...params) {
        return fn(...params).catch(this.pas.error);
    }

    get toggleShowDate() {
        return this.showDate = !this.showDate;
    }

    test() {
        this.pas.success('Hola madapaka!');
    }

    testError() {
        this.pas.error('Error madapaka!');
    }

    private initLine = async () => {
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

    private sLoading() {
        this.loading = this.ls.g_loading;
    }

    private handleDateChange(field): void {
        this.select.subscribe((date: Date) => this.toggleShowDate || this.hotbedForm.get(field).setValue(date));
    }

    private get initHotbedForm(): FormGroup {
        return this.fb.group({
            name: [null, Validators.required],
            official_date: [null, [Validators.required, ValidatorDate.isDate]],
            line_research: [null, Validators.required],
            training_center: [null, Validators.required],
            leader: [null, Validators.required],
            co_leader: [null, Validators.required],
        });
    }

}
