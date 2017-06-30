/**
 * Created by KingKong on 2017/6/29.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {FormBuilder, FormGroup} from "@angular/forms";


@Injectable()
export class CustomizeFormValidateService {
  constructor(private http: Http) {
  }

  buildForm(component: any): FormGroup {
    const fb = new FormBuilder(), formControlList = Object.keys(component.formModel), config = {};

    component.formControlList.forEach(item => {
      config[item] = ['', null];
    });
    component.customizeForm = fb.group(config);

    this.http.get(host + '/SysConfig/FormValidateList?formCode=' + formName).subscribe(ret => {
      this.formConfig = ret.json();
      this.buildForm();
    });
    return customizeForm;
  }
}

export declare interface ICustomizeFormValidate {
  customizeForm: FormGroup;
  formConfig: FormValidatorVO[];
  formConfigHash: { [key: string]: number };
  validationMessages: { [key: string]: { [key: string]: string } };
  formErrors: { [key: string]: string };
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
