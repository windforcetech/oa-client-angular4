import {NgModule} from '@angular/core';

import {SystemRouterModule} from './system.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {SystemIndexComponent} from './system-index/system-index.component';

@NgModule({
  imports: [
    SystemRouterModule,
    CommonComponentModule
  ],
  declarations: [SystemIndexComponent]
})
export class SystemModule {
}
