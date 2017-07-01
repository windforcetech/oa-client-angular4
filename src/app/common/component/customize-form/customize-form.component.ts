import {Component, ElementRef, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ValidatorFn, AbstractControl, AsyncValidatorFn} from '@angular/forms';
import {BaseResponseOptions, BrowserXhr, CookieXSRFStrategy, Http, RequestOptions, XHRBackend} from '@angular/http';

@Component({
  selector: 'app-customize-form',
  templateUrl: './customize-form.component.html',
  styleUrls: ['./customize-form.component.css']
})
export class CustomizeFormComponent implements OnInit {
  formName = '';
  formControlList: string[];
  formModel: any;

  form: Element = null;
  fb: FormBuilder = null;
  http: Http = null;

  customizeForm: FormGroup = null;
  formConfig: FormValidatorVO[] = null;
  formConfigHash: { [key: string]: number } = null;
  validationMessages: { [key: string]: { [key: string]: string } } = null;
  formErrors: { [key: string]: string } = null;

  constructor(public el: ElementRef) {
    this.form = el.nativeElement;
    this.fb = new FormBuilder();
    this.http = new Http(new XHRBackend(new BrowserXhr(), new BaseResponseOptions(), new CookieXSRFStrategy()), new RequestOptions());

    this.formConfigHash = {};
    this.validationMessages = {};
    this.formErrors = {};
  }

  ngOnInit(): void {
    const config = {};
    this.formControlList.forEach(item => {
      config[item] = ['', null];
    });
    this.customizeForm = this.fb.group(config);

    this.http.get('http://192.168.1.36:3000/api/SysConfig/FormValidateList?formCode=' + this.formName).subscribe(ret => {
      this.formConfig = ret.json();
      this.buildForm();
    });
  }

  buildForm() {

  }
}



export abstract class ModelVO {
}

export class FormValidatorVO {
  ID: number;
  FormCode: string;
  FieldCode: string;
  FieldName: string;
  Required: boolean;
  RequiredMessage: string;
  MaxLength: number;
  MaxLengthMessage: string;
  MinLength: number;
  MinLengthMessage: string;
  Max: string;
  MaxMessage: string;
  Min: string;
  MinMessage: string;
  EqualTo: string;
  EqualToMessage: string;
  Regex: string;
  RegexMessage: string;
  Remote: string;
  RemoteMessage: string;
  Inherit: boolean;
  RangeType: number;
  PlaceHolder: string;
}
