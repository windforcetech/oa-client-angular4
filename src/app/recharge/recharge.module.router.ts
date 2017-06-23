/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RightEmptyComponent} from '../common/component/right-empty/right-empty.component';
import {RechargeRootComponent} from './recharge.root.component';
import {RechargeIndexComponent} from './recharge-index/recharge-index.component';
import {RechargeDetailComponent} from './recharge-detail/recharge-detail.component';
import {RechargeConfigComponent} from './recharge-config/recharge-config.component';


const rechargeRouter: Routes = [
  {
    path: '', component: RechargeRootComponent, children: [
    {
      path: '', component: RechargeIndexComponent, children: [
      {path: '', component: RightEmptyComponent},
      {path: 'patient-detail', component: RechargeDetailComponent}
    ]
    },
    {
      path: 'recharge-config', component: RechargeConfigComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(rechargeRouter)],
  exports: [RouterModule]
})
export class RechargeRouterModule {
}
