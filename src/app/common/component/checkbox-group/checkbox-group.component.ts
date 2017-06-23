import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {ICheckboxGroupItemComponent, MCheckboxGroupItem} from '../checkbox-group-item/checkbox-group-item.component';
const CHECK_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupComponent),
  multi: true
};
@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.css'],
  providers: [CHECK_GROUP_VALUE_ACCESSOR]
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor, ICheckboxGroupItemComponent {
  @Input()
  data: MCheckboxGroupItem[] = [];

  values: any[] = null;

  tempValues: Map<any, any> = null;

  onChange = null;
  onTouched = null;

  constructor() {
  }

  onCheckboxClick(val: any): void {
   // this.values[index] = this.data[index].value + '';
    this.onChange(this.values);
  }

  ngOnInit() {
    this.values = [];
    this.tempValues = new Map<any, any>();
    this.data.forEach((item, i) => {
      if (this.tempValues.has(item.value)) {
        this.tempValues.get(item.value).push(i);
      } else {
        this.tempValues.set(item.value, [i]);
      }
    });
  }

  writeValue(obj: any[]): void {
    if (Array.isArray(obj)) {
      obj.forEach(i => {
        this.tempValues.has(i)
      });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
