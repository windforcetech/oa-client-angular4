/**
 * Created by KingKong on 2017/5/25.
 */

import {NgModule} from '@angular/core';

import {HomeRouterModule} from './home.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {HomeIndexComponent} from './home-index/home-index.component';
import {HomeNoticeComponent} from './home-notice/home-notice.component';

@NgModule({
  declarations: [
    HomeIndexComponent,
    HomeNoticeComponent
  ],
  imports: [
    HomeRouterModule,
    CommonComponentModule
  ],
  providers: [],
  entryComponents: [
    HomeNoticeComponent
  ]
})
export class HomeModule {
}
