/**
 * Created by KingKong on 2017/6/21.
 */
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {CommonComponentModule} from './component/common-component.module';

import {HomeService} from './service/home.service';
import {MainService} from './service/main.service';
import {PatientService} from './service/patient.service';
import {ScheduleService} from './service/schedule.service';
import {LocalStorageService} from './service/local-storage.service';
import {UserService} from './service/user.service';
import {CustomizeSliderService} from './service/customize-slider.service';
import {ApplicationService} from './service/application.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonComponentModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    HomeService,
    UserService,
    MainService,
    PatientService,
    ScheduleService,
    ApplicationService,
    LocalStorageService,
    CustomizeSliderService
  ]
})
export class CommonCoreModule {
}
