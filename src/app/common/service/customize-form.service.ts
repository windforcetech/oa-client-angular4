/**
 * Created by KingKong on 2017/6/23.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {FormGroup} from '@angular/forms';

@Injectable()
export class CustomizeFormService {
  constructor(private http: Http) {

  }

  buildForm() {

  }
}

export declare interface ICustomizeForm {
  formName: string;
  formControlList: string[] ;
  formModel: any;
  customizeForm: FormGroup;
}


