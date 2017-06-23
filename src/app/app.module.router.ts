/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRouter: Routes = [
  {path: '', redirectTo: 'demo', pathMatch: 'full'},
  {path: 'demo', loadChildren: 'app/demo/demo.module#DemoModule'},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
  {path: 'patient', loadChildren: 'app/patient/patient.module#PatientModule'},
  {path: 'recharge', loadChildren: 'app/recharge/recharge.module#RechargeModule'},
  {path: 'outpatient-fee', loadChildren: 'app/outpatient-fee/outpatient-fee.module#OutpatientFeeModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRouterModule {
}
