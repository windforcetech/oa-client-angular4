/**
 * Created by KingKong on 2017/5/27.
 */

import {NgModule} from '@angular/core';

import {PatientRouterModule} from './patient.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {PatientIndexComponent} from './patient-index/patient-index.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {AddPatientComponent} from './add-patient/add-patient.component';
import {PatientRootComponent} from './patient.root.component';

import {PatientConfigComponent} from './patient-index/patient-config/patient-config.component';

@NgModule({
  declarations: [
    PatientRootComponent,
    PatientIndexComponent,
    PatientDetailComponent,
    PatientListComponent,
    AddPatientComponent,
    PatientConfigComponent
  ],
  imports: [
    PatientRouterModule,
    CommonComponentModule
  ],
  providers: [],
  entryComponents: []
})
export class PatientModule {
}
