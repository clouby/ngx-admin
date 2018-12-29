import {
  Directive,
  HostListener,
  EventEmitter,
  Output,
  AfterContentInit,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { FormDialogService } from '../../../@core/services/form-dialog.service';
import { NbDialogService } from '@nebular/theme';
import { ContComponent } from '../../../@core/models/cont-component';
import {
  ControlContainer,
  FormGroupDirective,
  AbstractControl,
  FormGroup,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import GlobalPropsDialog from '../global-props/global-props.directive';

@Directive({
  selector: '[ngxLoadFormComp]',
  host: {
    '[readonly]': 'readonly',
  },
})
export class LoadDialogDirective extends GlobalPropsDialog
  implements AfterContentInit, OnDestroy {
  @Output() onResult = new EventEmitter<any>();

  private control: AbstractControl;
  private subs_control: Subscription;
  private load_cont: Subscription;

  constructor(
    private er: ElementRef,
    private cd: ChangeDetectorRef,
    private fd: FormDialogService,
    private ds: NbDialogService,
    private cc: ControlContainer,
  ) {
    super();
  }

  ngAfterContentInit() {
    this.control = this.form.get(this.attr_control);
    this.subs_control = this.control.statusChanges.subscribe(data => {
      this.success = data === 'VALID';
      this.danger = data === 'INVALID';
    });
  }

  get attr_control() {
    const { value } = this.er.nativeElement.attributes.getNamedItem(
      'formcontrolname',
    );
    return value;
  }

  get form(): null | FormGroup {
    return this.cc.formDirective
      ? (this.cc.formDirective as FormGroupDirective).form
      : null;
  }

  @HostListener('click', ['$event.target']) onClick({ value }) {
    this.control = this.form.get(this.attr_control);
    this.builderForm(this.attr_control, value);
  }

  @HostListener('blur') onBlur() {
    this.cd.detectChanges();
  }

  private handleResult(data): void {
    return data && this.onResult.emit(data);
  }

  private builderForm(field: string, current?: any) {
    const cont = this.fd.forms(field) as ContComponent;

    if (!cont) return;

    this.load_cont = this.ds
      .open(cont.component, {
        context: {
          ...cont.data,
          data: {
            ...cont.data.data,
            index: field,
            [field]: current,
          },
        },
        ...cont.config,
      })
      .onClose.subscribe(this.handleResult.bind(this));
  }

  ngOnDestroy() {
    this.subs_control.unsubscribe();
    this.load_cont && this.load_cont.unsubscribe();
  }
}
