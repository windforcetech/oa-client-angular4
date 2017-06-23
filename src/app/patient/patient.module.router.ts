/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RightEmptyComponent} from '../common/component/right-empty/right-empty.component';

import {PatientRootComponent} from './patient.root.component';
import {PatientListComponent} from './patient-list/patient-list.component';
import {PatientDetailComponent} from './patient-detail/patient-detail.component';
import {PatientIndexComponent} from './patient-index/patient-index.component';
import {PatientConfigComponent} from "./patient-index/patient-config/patient-config.component";


const patientRouter: Routes = [
  {
    path: '', component: PatientRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: PatientIndexComponent, children: [
      {path: '', component: RightEmptyComponent},
      {path: 'patient-detail', component: PatientDetailComponent},
      {path: 'ready-test', component: PatientConfigComponent, outlet: 'patient-config'}
    ]
    },
    {
      path: 'patient-list', component: PatientListComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(patientRouter)],
  exports: [RouterModule]
})
export class PatientRouterModule {
}
