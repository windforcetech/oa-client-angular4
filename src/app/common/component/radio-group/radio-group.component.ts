import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true
};

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css'],
  providers: [RADIO_GROUP_VALUE_ACCESSOR]
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
  @Input()
  data = [];

  value: any = null;

  values: any[] = null;

  onChange = null;
  onTouched = null;

  constructor() {
  }

  clickItem(index) {
    for (let i = 0; i < this.values.length; i++) {
      this.values[i] = '';
    }
    this.values[index] = this.data[index].value + '';
    this.value = this.data[index].value;
    this.onChange(this.value);
  }

  ngOnInit() {
    this.values = [];
    this.data.forEach(item => this.values.push(''));
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
