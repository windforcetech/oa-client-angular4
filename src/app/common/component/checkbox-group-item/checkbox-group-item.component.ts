import {Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxGroupItemComponent),
  multi: true
};

@Component({
  selector: 'app-checkbox-group-item',
  templateUrl: './checkbox-group-item.component.html',
  styleUrls: ['./checkbox-group-item.component.css'],
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckboxGroupItemComponent implements OnInit, ControlValueAccessor {
  @Input()
  data: MCheckboxGroupItem = null;

  checked: string = null;
  onChange = null;
  onTouched = null;

  @Output()
  onCheckboxClick = new EventEmitter<any>();

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.currentTarget === this.el.nativeElement) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      if (this.checked === null) {
        this.checked = 'checked';
        this.onChange(this.data);
      } else {
        this.checked = null;
        this.onChange(null);
      }
      this.onCheckboxClick.emit(event);
    }
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined || obj === '') {
      this.checked = null;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
export interface ICheckboxGroupItemComponent {
  onCheckboxClick(val: any): void;
}
export class MCheckboxGroupItem {
  label: string = null;
  value: any = null;
}
