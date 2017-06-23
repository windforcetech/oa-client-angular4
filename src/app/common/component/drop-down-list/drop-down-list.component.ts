import {Component, forwardRef, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const DROP_DOWN_LIST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DropDownListComponent),
  multi: true
};

@Component({
  selector: 'app-drop-down-list',
  templateUrl: './drop-down-list.component.html',
  styleUrls: ['./drop-down-list.component.css'],
  animations: [
    trigger('heightFadeIn', [
      state('in', style({transform: 'scaleY(0)'})),
      state('out', style({transform: 'scaleY(1)'})),
      transition('in => out', animate('120ms')),
      transition('out => in', animate('120ms'))
    ])],
  providers: [
    DROP_DOWN_LIST_VALUE_ACCESSOR
  ]
})
export class DropDownListComponent implements OnInit, ControlValueAccessor {
  itemList: { [label: string]: string }[] = null;
  text = '';
  status = 'in';
  maskState = 'none';

  @Input()
  selectIndex = 0;

  @Input()
  required = false;

  @Input()
  placeholder = '';

  onChange: Function = null;
  onTouched: Function = null;

  @Input()
  set dataList(val: { [label: string]: string }[]) {
    this.itemList = val;
    setTimeout(() => {
      if (!this.required) {
        this.itemList.splice(0, 0, {label: this.placeholder, value: this.placeholder});
      }
    }, 0);
  }

  constructor() {
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined || obj === '') {
      return;
    }
    this.itemList.forEach((item, i) => {
      if (obj === item.value) {
        this.selectIndex = i;
        this.text = item.label;
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
  }

  changeStatus() {
    if (this.status === 'in') {
      this.status = 'out';
      this.maskState = 'block';
    } else {
      this.status = 'in';
      this.maskState = 'none';
    }
  }

  onItemClick(key, index, value) {
    this.selectIndex = index;
    if (key === this.placeholder) {
      this.text = '';
    } else {
      this.text = key;
      this.onChange(value);
    }
    this.changeStatus();
  }
}

