import { Directive, HostListener, EventEmitter, Output, AfterContentInit, ChangeDetectorRef, ElementRef, OnDestroy, HostBinding } from '@angular/core';
import { FormDialogService } from '../../../@core/services/form-dialog.service';
import { NbDialogService } from '@nebular/theme';
import { ContComponent } from '../../../@core/models/cont-component';
import { ControlContainer, FormGroupDirective, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[ngxLoadFormComp]',
})
export class LoadDialogDirective implements AfterContentInit, OnDestroy {
    @Output('onResult') onResult = new EventEmitter<any>();
    // Show style status for (valid/invalid)
    @HostBinding('class.form-control-success') success: boolean = false;
    @HostBinding('class.form-control-danger') danger: boolean = false;

    private control: AbstractControl;
    private subs_control: Subscription;
    private subs_dialog: Subscription;

    constructor(private er: ElementRef,
        private cd: ChangeDetectorRef,
        private fd: FormDialogService,
        private ds: NbDialogService,
        private cc: ControlContainer) { }

    ngAfterContentInit() {
        this.control = this.form.get(this.attr_control);
        this.subs_control = this.control.statusChanges.subscribe(data => {
            this.success = data === 'VALID';
            this.danger = data === 'INVALID';
        });
    }

    get attr_control() {
        const { value } = this.er.nativeElement.attributes.getNamedItem('formcontrolname');
        return value;
    }

    get form() {
        return this.cc.formDirective ? (this.cc.formDirective as FormGroupDirective).form : null;
    }

    @HostListener('click', ['$event.target']) onClick({ value }) {
        this.control = this.form.get(this.attr_control);
        this.formTrigger(this.attr_control, value);
    }

    @HostListener('blur') onBlur() {
        this.cd.detectChanges();
    }

    private handleResult(data): void {
        return data && this.onResult.emit(data);
    }

    private formTrigger(field: string, current?: any) {
        const cont = this.fd.forms(field) as ContComponent;

        if (!cont) return;

        this.subs_dialog = this.ds.open(cont.component, {
            context: {
                ...cont.data,
                ...{
                    [field]: current,
                },
            },
            ...cont.config,
        }).onClose.subscribe(this.handleResult.bind(this));
    }

    ngOnDestroy() {
        [this.subs_control, this.subs_dialog].forEach((sub: Subscription) => sub.unsubscribe());
    }

}
