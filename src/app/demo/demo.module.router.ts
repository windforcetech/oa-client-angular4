/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoIndexComponent} from './demo-index/demo-index.component';
import {DemoRightDetailComponent} from './demo-index/demo-right-detail/demo-right-detail.component';
import {RightEmptyComponent} from '../common/component/right-empty/right-empty.component';
import {DemoConfigComponent} from './demo-config/demo-config.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {DemoListDetailComponent} from './demo-list/demo-list-detail/demo-list-detail.component';
import {MainRootComponent} from '../common/component/main-root/main-root.component';
import {DemoLargeComponent} from './demo-large/demo-large.component';
import {DemoLargeDetailComponent} from './demo-large/demo-large-detail/demo-large-detail.component';
import {DemoListDetailInfoComponent} from './demo-list/demo-list-detail/demo-list-detail-info/demo-list-detail-info.component';

const demoRouter: Routes = [
  {
    path: '',
    component: MainRootComponent,
    children: [
      {path: '', redirectTo: 'index', pathMatch: 'full'},
      {
        path: 'index', component: DemoIndexComponent, children: [
        {path: '', component: RightEmptyComponent},
        {path: 'detail', component: DemoRightDetailComponent}
      ]
      },
      {path: 'config', component: DemoConfigComponent},
      {
        path: 'list', component: DemoListComponent, children: [
        {path: '', component: RightEmptyComponent},
        {
          path: 'detail/:detail-id', component: DemoListDetailComponent, children: [
          {path: 'detail-info/:info-id', component: DemoListDetailInfoComponent}
        ]
        }
      ]
      },
      {
        path: 'large', component: DemoLargeComponent, children: [
        {path: '', component: RightEmptyComponent},
        {path: 'detail/:detail-id', component: DemoLargeDetailComponent}
      ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(demoRouter)],
  exports: [RouterModule]
})
export class DemoRouterModule {
}
