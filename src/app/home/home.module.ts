/**
 * Created by KingKong on 2017/5/25.
 */

import {NgModule} from '@angular/core';

import {HomeRouterModule} from './home.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {HomeRootComponent} from './home.root.component';
import {HomeIndexComponent} from './home-index/home-index.component';
import {HomeNoticeComponent} from './home-notice/home-notice.component';
import {HomeRightDetailComponent} from './home-index/home-right-detail/home-right-detail.component';

@NgModule({
  declarations: [
    HomeRootComponent,
    HomeIndexComponent,
    HomeNoticeComponent,
    HomeRightDetailComponent
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
