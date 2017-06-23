import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const SELECT_BUTTON_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButtonGroupComponent),
  multi: true
};

@Component({
  selector: 'app-select-button-group',
  templateUrl: './select-button-group.component.html',
  styleUrls: ['./select-button-group.component.css'],
  providers: [SELECT_BUTTON_GROUP_VALUE_ACCESSOR]
})
export class SelectButtonGroupComponent implements OnInit, ControlValueAccessor {
  @Input()
  list: SelectButtonGroupStatus[] = null;

  selectedValues: string[] = null;

  onChange: Function = null;
  onTouched: Function = null;

  constructor() {
    this.selectedValues = [];
  }

  ngOnInit() {
  }

  onItemClick(index) {
    this.list[index].selected = !this.list[index].selected;
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
export class SelectButtonGroupStatus {
  public title: string = null;
  public value: string = null;
  public selected = false;
}
