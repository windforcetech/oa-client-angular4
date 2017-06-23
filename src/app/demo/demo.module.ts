/**
 * Created by KingKong on 2017/5/25.
 */

import {NgModule} from '@angular/core';

import {DemoRouterModule} from './demo.module.router';
import {CommonCoreModule} from '../common/common-core.module';
import {CommonComponentModule} from '../common/component/common-component.module';

import {DemoIndexComponent} from './demo-index/demo-index.component';
import {DemoNoticeComponent} from './demo-notice/demo-notice.component';
import {DemoRightDetailComponent} from './demo-index/demo-right-detail/demo-right-detail.component';
import {DemoConfigComponent} from './demo-config/demo-config.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {DemoListDetailComponent} from './demo-list/demo-list-detail/demo-list-detail.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {DemoLargeComponent} from './demo-large/demo-large.component';
import {DemoLargeDetailComponent} from './demo-large/demo-large-detail/demo-large-detail.component';
import {DemoListDetailInfoComponent} from './demo-list/demo-list-detail/demo-list-detail-info/demo-list-detail-info.component';
import {DemoPopupComponent} from './demo-popup/demo-popup.component';


@NgModule({
  declarations: [
    DemoIndexComponent,
    DemoNoticeComponent,
    DemoRightDetailComponent,
    DemoConfigComponent,
    DemoListComponent,
    DemoListDetailComponent,
    DemoFormComponent,
    DemoLargeComponent,
    DemoLargeDetailComponent,
    DemoListDetailInfoComponent,
    DemoPopupComponent
  ],
  imports: [
    DemoRouterModule,
    CommonCoreModule,
    CommonComponentModule
  ],
  providers: [],
  entryComponents: [
    DemoNoticeComponent,
    DemoPopupComponent
  ]
})
export class DemoModule {
}
