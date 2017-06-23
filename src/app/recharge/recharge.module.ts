import {NgModule} from '@angular/core';

import {RechargeRouterModule} from './recharge.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {RechargeRootComponent} from './recharge.root.component';
import {RechargeIndexComponent} from './recharge-index/recharge-index.component';
import {RechargeDetailComponent} from './recharge-detail/recharge-detail.component';
import {RechargeConfigComponent} from './recharge-config/recharge-config.component';


@NgModule({
  imports: [
    RechargeRouterModule,
    CommonComponentModule
  ],
  declarations: [
    RechargeRootComponent,
    RechargeIndexComponent,
    RechargeDetailComponent,
    RechargeConfigComponent
  ]
})
export class RechargeModule {
}
