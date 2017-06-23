import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const ICON_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => IconInputComponent),
  multi: true
};

@Component({
  selector: 'app-icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.css'],
  providers: [ICON_INPUT_VALUE_ACCESSOR]
})
export class IconInputComponent implements OnInit, ControlValueAccessor {

  @Input()
  marginRight: any = null;

  @Input()
  iconList: string[] = null;

  @Output()
  onIconClick = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }
}
