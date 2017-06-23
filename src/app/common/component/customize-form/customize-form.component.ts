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
  formControlList: string[] = null;
  formModel: ModelVO = null;

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
    const tmpValue = {};

    this.formConfig.forEach((validateItem, index) => {
      const item: FormValidatorVO = <FormValidatorVO>validateItem;
      const ele: HTMLInputElement = <HTMLInputElement>this.form.querySelector('#' + item.FieldCode);
      if (!ele) {
        return;
      }
      if (item.PlaceHolder !== null) {
        ele.placeholder = stringFormat(item.PlaceHolder, item.FieldName);
      }

      this.formConfigHash[item.FieldCode] = index;

      this.validationMessages[item.FieldCode] = {};

      if (item.hasOwnProperty('RequiredMessage') && item.RequiredMessage !== null) {
        this.validationMessages[item.FieldCode]['Required'] = stringFormat(item.RequiredMessage, item.FieldName);
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('RegexMessage') && item.RegexMessage !== null) {
        this.validationMessages[item.FieldCode]['Regex'] = stringFormat(item.RegexMessage, item.FieldName);
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('MaxMessage') && item.MaxMessage !== null) {
        this.validationMessages[item.FieldCode]['Max'] = stringFormat(item.MaxMessage, item.FieldName, item.Max + '');
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('MinMessage') && item.MinMessage !== null) {
        this.validationMessages[item.FieldCode]['Min'] = stringFormat(item.MinMessage, item.FieldName, item.Min + '');
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('MaxLengthMessage') && item.MaxLengthMessage !== null) {
        this.validationMessages[item.FieldCode]['MaxLength'] = stringFormat(
          item.MaxLengthMessage,
          item.FieldName,
          item.MaxLength + ''
        );
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('MinLengthMessage') && item.MinLengthMessage !== null) {
        this.validationMessages[item.FieldCode]['MinLength'] = stringFormat(
          item.MinLengthMessage,
          item.FieldName,
          item.MinLength + ''
        );
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('EqualToMessage') && item.EqualToMessage !== null) {
        this.validationMessages[item.FieldCode]['EqualTo'] = stringFormat(item.EqualToMessage, item.FieldName);
        this.formErrors[item.FieldCode] = '';
      }
      if (item.hasOwnProperty('RemoteMessage') && item.RemoteMessage !== null) {
        this.validationMessages[item.FieldCode]['Remote'] = stringFormat(item.RemoteMessage, item.FieldName);
        this.formErrors[item.FieldCode] = '';
      }

      const validatorList: ValidatorFn[] = [];
      if (item.hasOwnProperty('Required') && item.Required !== null && item.Required !== false) {
        tmpValue[item.FieldCode] = '';
        validatorList.push(customizeRequiredValidator(item.FieldCode));
      }
      if (item.hasOwnProperty('Regex') && item.Regex !== null) {
        validatorList.push(customizeRegexValidator(new RegExp(item.Regex), item.FieldCode));
      }
      if (item.hasOwnProperty('MaxLength') && item.MaxLength !== null) {
        validatorList.push(customizeMaxLengthValidator(item.MaxLength, item.FieldCode));
      }
      if (item.hasOwnProperty('MinLength') && item.MinLength !== null) {
        validatorList.push(customizeMinLengthValidator(item.MinLength, item.FieldCode));
      }
      if (item.hasOwnProperty('Max') && item.Max !== null) {
        validatorList.push(customizeMaxValidator(item.Max, item.RangeType, item.FieldCode, this.customizeForm));
      }
      if (item.hasOwnProperty('Min') && item.Min !== null) {
        validatorList.push(customizeMinValidator(item.Min, item.RangeType, item.FieldCode, this.customizeForm));
      }
      if (item.hasOwnProperty('EqualTo') && item.EqualTo !== null) {
        validatorList.push(customizeEqualToValidator(item.EqualTo, item.FieldCode));
      }
      this.customizeForm.get(item.FieldCode).setValidators(validatorList);

      if (item.hasOwnProperty('Remote') && item.Remote !== null) {
        this.customizeForm.get(item.FieldCode).setAsyncValidators(customizeRemoteValidator(
          item.Remote,
          this.http,
          this.formErrors,
          this.validationMessages,
          item.FieldCode));
      }
    });

    const arr: string[] = Object.keys(this.customizeForm.controls);
    for (const key of arr) {
      this.customizeForm.get(key).valueChanges.subscribe(data => {
        this.formModel[key] = data;
        validatorMessageFn(this.customizeForm, this.formErrors, this.validationMessages, key, data);
      });
    }

    this.customizeForm.setValue(tmpValue);
  }
}


function stringFormat(template: string, ...args: string[]): string {
  if (template == null || typeof template === 'undefined') {
    return '';
  }
  let ret = template;
  for (let i = 0; i < args.length; i++) {
    ret = ret.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
  }
  return ret;
}


// 自定义验证规则：最大长度
function customizeMaxLengthValidator(length: number, field: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    let len = 0;
    if (control.value !== null) {
      len = control.value.length;
    }
    return len <= length ? null : {'MaxLength': true};
  };
}
// 自定义验证规则：最小长度
function customizeMinLengthValidator(length: number, field: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    let len = 0;
    if (control.value !== null) {
      len = control.value.length;
    }
    return len >= length ? null : {'MinLength': true};
  };
}

// 自定义验证规则：必填项
function customizeRequiredValidator(field: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    return (control.value === '' || control.value === null || typeof control.value === 'undefined') ? {'Required': true} : null;
  };
}
// 自定义验证规则：最大值
function customizeMaxValidator(max: string, rangeType: number, field: any, form: FormGroup): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    if (rangeType === 0) {
      const ls = max.split('|'), len = ls.length, reg: RegExp = /^[0-9]*$/;
      let i = 0, ret, maxValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          maxValue = parseInt(form.get(ls[i].replace('ValueOf:', '')).value, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            return ret <= maxValue ? null : {Max: true};
          }
        } else {
          maxValue = parseInt(max, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            ret = isNaN(ret) ? 0 : ret;
            return ret <= maxValue ? null : {Max: true};
          } else {
            return null;
          }
        }
      }
    } else if (rangeType === 1) {
      const ls = max.split('|'), len = ls.length;
      let i = 0, ret, maxValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          maxValue = Date.parse(form.get(ls[i].replace('ValueOf:', '')).value);
          ret = Date.parse(control.value);
          return ret <= maxValue ? null : {Max: true};
        } else if (ls[i].indexOf('Now:') > -1) {
          maxValue = parseInt(max, 10);
          ret = parseInt(control.value, 10);
          return ret <= maxValue ? null : {Max: true};
        } else {
          return null;
        }
      }
    }
  };
}
// 自定义验证规则：最小值
function customizeMinValidator(min: string, rangeType: number, field: any, form: FormGroup): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    if (rangeType === 0) {
      const ls = min.split('|'), len = ls.length, reg: RegExp = /^[0-9]*$/;
      let i = 0, ret, minValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          minValue = parseInt(form.get(ls[i].replace('ValueOf:', '')).value, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            return ret <= minValue ? null : {Max: true};
          }
        } else {
          minValue = parseInt(min, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            ret = isNaN(ret) ? 0 : ret;
            return ret >= minValue ? null : {Max: true};
          } else {
            return {Regex: true};
          }
        }
      }
    } else if (rangeType === 1) {
      const ls = min.split('|'), len = ls.length;
      let i = 0, ret, minValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          minValue = Date.parse(form.get(ls[i].replace('ValueOf:', '')).value);
          ret = Date.parse(control.value);
          return ret <= minValue ? null : {Max: true};
        } else if (ls[i].indexOf('Now:') > -1) {
          minValue = parseInt(min, 10);
          ret = parseInt(control.value, 10);
          return ret <= minValue ? null : {Max: true};
        } else {
          return {Regex: true};
        }
      }
    }
  };
}

// 自定义验证规则：与同一表单其他项比较
function customizeEqualToValidator(equalToField: string, field: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const equalField = control.parent.get(equalToField);
    return control.value === equalField.value ? null : {EqualTo: true};
  };
}

// 自定义验证规则：正则匹配
function customizeRegexValidator(reg: RegExp, field: any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {

    const value = control.value;
    const ret = reg.test(value);
    return ret ? null : {Regex: true};
  };
}

// 自定义验证规则：远程匹配
function customizeRemoteValidator(url: string, http: Http, formErrors: any, validationMessages: any, field: any): AsyncValidatorFn {
  return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {

      http.post(url, {value: control.value}).subscribe(t => {
        const ret = t.json();
        if (ret.result === true) {
          resolve(null);
        } else {
          formErrors[field] = validationMessages[field]['Remote'];
          resolve({Remote: true});
        }
      });
    });
  };
}

const validationOrder: string[] = ['Required', 'Regex', 'MaxLength', 'MinLength', 'Max', 'Min', 'EqualTo', 'Remote'];

function validatorMessageFn(form: any, formErrors: any, validationMessages, field: string, data?: any) {
  if (!form) {
    return;
  }
  if (formErrors && formErrors.hasOwnProperty(field)) {
    formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const messages = validationMessages[field];
      for (const obj of validationOrder) {
        if (control.errors && control.errors.hasOwnProperty(obj)) {
          (formErrors[field] = messages[obj] + '');
          break;
        }
      }
    }
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
