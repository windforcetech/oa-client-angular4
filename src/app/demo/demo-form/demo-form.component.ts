import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

import {ICustomizeFormValidate, CustomizeFormValidateService} from '../../common/service/customize-form.service';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.css']
})
export class DemoFormComponent implements OnInit, ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formPlaceholder: { [key: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };
  formErrors: { [p: string]: string };

  constructor(private form: CustomizeFormValidateService) {
  }

  ngOnInit() {
    this.formName = 'ProcessSent';
    this.form.buildForm(this);
  }

  test() {
    console.log(this.formModel);
  }
}
