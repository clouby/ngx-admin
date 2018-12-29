import { Directive, AfterViewInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import GlobalPropsDialog from '../global-props/global-props.directive';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngxStatusControl]',
  host: {
    '[readonly]': 'readonly',
  },
})
export class StatusControlDirective extends GlobalPropsDialog
  implements AfterViewInit, OnDestroy {
  private control_subs: Subscription;

  constructor(private _cc: NgControl) {
    super();
    this.readonly = false;
  }

  ngAfterViewInit() {
    this.control_subs = this._cc.statusChanges.subscribe(data => {
      this.success = data === 'VALID';
      this.danger = data === 'INVALID';
    });
  }

  ngOnDestroy() {
    this.control_subs.unsubscribe();
  }
}
