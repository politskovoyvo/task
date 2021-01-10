import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 't-input',
  templateUrl: './t-input.component.html',
  styleUrls: ['./t-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TInputComponent),
      multi: true,
    },
  ],
})
export class TInputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder = 'Введите название';
  @Input() type: 'input' | 'textarea' = 'input';
  @Input() width = '100%';

  textValue = '';

  constructor() {}

  ngOnInit(): void {}

  onChange: any = () => {};

  onTouched: any = () => {};

  writeValue(obj: any): void {
    if (!obj || obj === this.textValue) {
      return;
    }

    this.onChange(this.textValue);
  }

  inputChange(value: string) {
    this.writeValue(value);
    this.onChange(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
}
