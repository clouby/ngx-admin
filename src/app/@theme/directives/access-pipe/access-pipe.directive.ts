import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MobilePhonePipe } from '../../pipes';

@Directive({
  selector: '[ngxAccessPipe]',
  host: {
    '(change)': 'onChanged($event.target.value)',
    '(blur)': 'onTouched($event.target.value)',
    '(focus)': 'onFocus($event.target.value)',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AccessPipeDirective,
      multi: true,
    },
    MobilePhonePipe,
  ],
})
export class AccessPipeDirective implements ControlValueAccessor {
  private _onChange: Function;
  private _onTouched: Function;
  private _value: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private phone: MobilePhonePipe,
  ) {
    this._onChange = (_: any) => {};
    this._onTouched = () => {};
  }

  set value(val) {
    this._value = val;
    this._onChange(this._value);
  }

  public onFocus(val: any) {
    if (val) this.renderValue(this._value);
  }

  public onChanged(val: any) {
    this.value = val;
  }

  public onTouched(_: any) {
    this.renderValue(this.phone.transform(this._value));
    this._onTouched(this._value);
  }

  private renderValue(val: string) {
    this.renderer.setProperty(this.el.nativeElement, 'value', val);
  }

  writeValue(val: any): void {
    this.value = val;
    this.renderValue(this.phone.transform(this._value));
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
