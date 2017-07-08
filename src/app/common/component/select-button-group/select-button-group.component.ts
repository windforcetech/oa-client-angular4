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
  private _list: SelectButtonStatus[];
  get list(): SelectButtonStatus[] {
    return this._list;
  }

  @Input()
  set list(value: SelectButtonStatus[]) {
    this._list = value;

    this.selectedValues = [];
    this.selectedItems = [];
  }

  selectedValues: string[];
  selectedItems: SelectButtonStatus[];

  onChange: Function;
  onTouched: Function;

  ngOnInit() {
  }

  onItemClick(index) {
    const idx = this.selectedValues.indexOf(this.list[index].value), item = this.list[index];

    if (idx === -1) {
      this.selectedValues.push(item.value);
      this.selectedItems.push(item);
    } else {
      this.selectedValues.splice(idx, 1);
      this.selectedItems.splice(idx, 1);
    }
    this.selectedItems = Array.from(this.selectedItems);
    if (this.onChange) {
      this.onChange(this.selectedItems);
    }
  }

  writeValue(obj: SelectButtonStatus[]): void {
    this.selectedValues = [];
    this.selectedItems = [];
    if (obj) {
      for (const item of obj) {
        this.selectedValues.push(item.value);
        this.selectedItems.push(item);
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
export class SelectButtonStatus {
  public title: string = null;
  public value: string = null;
}
