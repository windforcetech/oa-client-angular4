import {
  Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, OnInit,
  Output
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupItemComponent),
  multi: true
};

@Component({
  selector: 'app-radio-group-item',
  templateUrl: './radio-group-item.component.html',
  styleUrls: ['./radio-group-item.component.css'],
  providers: [RADIO_VALUE_ACCESSOR]
})
export class RadioGroupItemComponent implements OnInit, ControlValueAccessor {
  @Input()
  label: string = null;
  @Input()
  value: any = null;

  checked: string = null;
  onChange = null;
  onTouched = null;

  @Output()
  onRadioClick = new EventEmitter<any>();

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  onClick(event) {
    if (event.currentTarget === this.el.nativeElement) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      this.checked = 'checked';
      this.onChange(this.value || this.label);
      this.onRadioClick.emit(event);
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
