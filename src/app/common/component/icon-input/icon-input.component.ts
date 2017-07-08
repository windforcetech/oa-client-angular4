import {Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

import {HttpService} from '../../service/http.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


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
  textValue: string;
  textInput: FormControl;

  @Input()
  marginRight: any;
  @Input()
  placeholder: string;
  @Input()
  iconList: InputIcon[];

  @Output()
  onIconClick = new EventEmitter<number>();

  onChange: Function;
  onTouched: Function;

  constructor(private http: HttpService) {
  }

  ngOnInit() {
    this.textInput = new FormControl();
    this.textInput.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(newValue => {
      this.textValue = newValue;
      this.http.get('/query?')
      console.log(this.textValue);
    });
  }

  onModelTouched() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  onModelIconClick(index) {
    this.onIconClick.emit(index);
  }

  writeValue(obj: any): void {
    if (this.textValue !== obj) {
      this.textValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

export class InputIcon {
  icon: string;
  color: string;
}
