import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 't-select',
  templateUrl: './t-select.component.html',
  styleUrls: ['./t-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TSelectComponent),
      multi: true,
    },
  ],
})
export class TSelectComponent implements OnInit, ControlValueAccessor {
  @Input() items = [];
  @Input() value: any;
  @Input() width = '100px';

  constructor() {}

  ngOnInit(): void {}

  onChange: any = () => {};

  onTouched: any = () => {};

  writeValue(obj: any, isModelChange = false): void {
    if (obj === undefined && obj === this.value) {
      return;
    }

    if (isModelChange) {
      this.onChange(this.value);
    }
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
}
