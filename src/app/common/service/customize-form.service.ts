/**
 * Created by KingKong on 2017/6/29.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn} from '@angular/forms';
import {FormKeyDictionaryService} from './form-key-dictionary.service';


@Injectable()
export class CustomizeFormValidateService {
  constructor(private http: Http, private form: FormKeyDictionaryService) {
  }

  buildForm(component: any): void {
    if (!component.formName) {
      throw new Error('未指定表单名');
    }

    const formControlList: string[] = this.form.getFormKeys(component.formName);
    if (!formControlList || !Array.isArray(formControlList) || formControlList.length === 0) {
      throw new Error('表单配置项列表不存在');
    }

    const fb = new FormBuilder(), config = {};
    component.formModel = {};
    component.formErrors = {};
    component.formPlaceholder = {};
    component.validationMessages = {};

    formControlList.forEach(item => {
      component.formModel[item] = '';
      component.formErrors[item] = '';
      component.formPlaceholder[item] = '';
      component.validationMessages[item] = {};
      config[item] = [component.formModel[item], null];
    });

    component.formGroup = fb.group(config);

    this.http.get('http://tclinicapi.qiezzi.com/api/SysConfig/FormValidateList?formCode=' + component.formName).subscribe(ret => {
      this.generateFormConfig(ret.json(), component);
    });
  }

  generateFormConfig(formConfig: FormValidatorVO[], component: any) {
    formConfig.forEach((validateItem) => {
      const item: FormValidatorVO = <FormValidatorVO>validateItem;

      if (item.PlaceHolder !== null) {
        component.formPlaceholder[item.FieldCode] = stringFormat(item.PlaceHolder, item.FieldName);
      }

      if (item.hasOwnProperty('RequiredMessage') && item.RequiredMessage !== null) {
        component.validationMessages[item.FieldCode]['Required'] = stringFormat(item.RequiredMessage, item.FieldName);
      }
      if (item.hasOwnProperty('RegexMessage') && item.RegexMessage !== null) {
        component.validationMessages[item.FieldCode]['Regex'] = stringFormat(item.RegexMessage, item.FieldName);
      }
      if (item.hasOwnProperty('MaxMessage') && item.MaxMessage !== null) {
        component.validationMessages[item.FieldCode]['Max'] = stringFormat(item.MaxMessage, item.FieldName, item.Max + '');
      }
      if (item.hasOwnProperty('MinMessage') && item.MinMessage !== null) {
        component.validationMessages[item.FieldCode]['Min'] = stringFormat(item.MinMessage, item.FieldName, item.Min + '');
      }
      if (item.hasOwnProperty('MaxLengthMessage') && item.MaxLengthMessage !== null) {
        component.validationMessages[item.FieldCode]['MaxLength'] = stringFormat(item.MaxLengthMessage, item.FieldName, item.MaxLength + '');
      }
      if (item.hasOwnProperty('MinLengthMessage') && item.MinLengthMessage !== null) {
        component.validationMessages[item.FieldCode]['MinLength'] = stringFormat(item.MinLengthMessage, item.FieldName, item.MinLength + '');
      }
      if (item.hasOwnProperty('EqualToMessage') && item.EqualToMessage !== null) {
        component.validationMessages[item.FieldCode]['EqualTo'] = stringFormat(item.EqualToMessage, item.FieldName);
      }
      if (item.hasOwnProperty('RemoteMessage') && item.RemoteMessage !== null) {
        component.validationMessages[item.FieldCode]['Remote'] = stringFormat(item.RemoteMessage, item.FieldName);
      }

      const validatorList: ValidatorFn[] = [];
      if (item.hasOwnProperty('Required') && item.Required !== null && item.Required !== false) {
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
        validatorList.push(customizeMaxValidator(item.Max, item.RangeType, item.FieldCode, component.formGroup));
      }
      if (item.hasOwnProperty('Min') && item.Min !== null) {
        validatorList.push(customizeMinValidator(item.Min, item.RangeType, item.FieldCode, component.formGroup));
      }
      if (item.hasOwnProperty('EqualTo') && item.EqualTo !== null) {
        validatorList.push(customizeEqualToValidator(item.EqualTo, item.FieldCode));
      }
      component.formGroup.get(item.FieldCode).setValidators(validatorList);

      if (item.hasOwnProperty('Remote') && item.Remote !== null) {
        component.formGroup.get(item.FieldCode).setAsyncValidators(customizeRemoteValidator(
          item.Remote,
          this.http,
          component.formErrors,
          component.validationMessages,
          item.FieldCode));
      }
    });

    const arr: string[] = Object.keys(component.formGroup.controls);
    for (const key of arr) {
      component.formGroup.get(key).valueChanges.subscribe(data => {
        component.formModel[key] = data;
        validatorMessageFn(component.formGroup, component.formErrors, component.validationMessages, key, data);
      });
    }

    component.formGroup.setValue(component.formModel);
  }
}

export declare interface ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formErrors: { [key: string]: string };
  formPlaceholder: { [key: string]: string };
  validationMessages: { [key: string]: { [key: string]: string } };
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
class FormKeyDictionary {
  public static readonly ProcessSent: string[] = ['CommonTime', 'ExpressCode', 'ContactID', 'DayNum'];
  public static readonly ProcessReworked: string[] = ['ReworkReason', 'CommonTime'];
  public static readonly ProcessReceived: string[] = ['CommonTime'];
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
