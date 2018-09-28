import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LineService } from '../../../@core/services/line.service';
import { BehaviorSubject } from 'rxjs';

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

    constructor(private fb: FormBuilder, private ls: LineService) { }

    ngOnInit() {
        this.hotbedForm = this.initHotbedForm;
        this.hotbedForm.valueChanges.subscribe(console.log);
        this.initLineResearch();
    }


    handleTest(e) {
        e.preventDefault();
    }

    get toggleShowDate() {
        return this.showDate = !this.showDate;
    }

    private async initLineResearch() {
        // Behavior from `loading` property from LineService
        this.sLoading();
        // Change status with Date values
        this.handleDateChange('official_date');
        // Get Line Research and Training Centers
        const { LINE_RESEARCH, TRAINING_CENTER } = await this.ls.all();

        // Assign inline variables about linesResource.
        [this.lineResearch, this.trainingCenter] = [LINE_RESEARCH, TRAINING_CENTER];

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
            official_date: [null, Validators.required],
            line_research: [null, Validators.required],
            training_center: [null, Validators.required],
        });
    }

}
