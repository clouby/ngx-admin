import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { UserService } from '../../../../@core/services';
import { UserInterface } from '../../../../@core/models/User.model';
import { of, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'ngx-leader-form',
  templateUrl: './leader-form.component.html',
  styleUrls: [
    './../hotbed-name/hotbed-name-form.component.scss',
    './leader-form.component.scss',
  ],
  providers: [UserService],
})
export class LeaderFormComponent implements OnInit, OnDestroy {
  // All external data for the context
  @Input() data: any;

  // Interface form defined.
  @Input() form: Object;

  // Form base that include all controls
  public FormBase: FormGroup;

  // When the request load has finished!
  submitted: boolean = false;

  // Object observable if we can create/update user
  requestUserObs: Observable<any>;
  requestUserSub: Subscription;

  constructor(
    protected ref: NbDialogRef<LeaderFormComponent>,
    private fb: FormBuilder,
    private user_s: UserService,
  ) {}

  ngOnInit(): void {
    this.FormBase = this.initForm;
    this.patchId(this.data);
  }

  onSubmit(): void {
    const { _id, ...data } = this.FormBase.value;
    this.requestUserObs = !_id
      ? this.user_s.create(<UserInterface>{ ...data })
      : of({
          action: 'UPDATE',
        });
    this.submit;
  }

  get _id() {
    return this.formField('_id').value;
  }

  formField(field: string): AbstractControl {
    return this.FormBase.get(field);
  }

  patchId({ index, ...comp }, key = '_id') {
    const nextPatch = {
      role: index,
      [key]: !!comp[index] ? comp[index] : null,
    };

    if (!nextPatch[key]) {
      this.FormBase.get(key).disable();
    }

    this.FormBase.patchValue({
      ...nextPatch,
    });
  }

  get initForm(): FormGroup {
    return this.fb.group({ ...this.form });
  }

  private get submit() {
    return this.ref.close();
  }

  ngOnDestroy() {
    this.requestUserSub && this.requestUserSub.unsubscribe();
  }
}
