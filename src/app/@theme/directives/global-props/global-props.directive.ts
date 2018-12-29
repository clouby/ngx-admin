import { HostBinding } from '@angular/core';

export default class GlobalPropsDialog {
  // Props by default
  public readonly: boolean = true;
  @HostBinding('class.form-control-success') success: boolean;
  @HostBinding('class.form-control-danger') danger: boolean;
}
