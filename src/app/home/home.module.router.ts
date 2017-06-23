/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeRootComponent} from './home.root.component';
import {HomeIndexComponent} from './home-index/home-index.component';
import {HomeRightDetailComponent} from './home-index/home-right-detail/home-right-detail.component';
import {RightEmptyComponent} from '../common/component/right-empty/right-empty.component';

const homeRouter: Routes = [
  {
    path: '',
    component: HomeRootComponent,
    children: [
      {path: '', redirectTo: 'index', pathMatch: 'full'},
      {
        path: 'index', component: HomeIndexComponent, children: [
        {path: '', component: RightEmptyComponent},
        {path: 'detail', component: HomeRightDetailComponent}
      ]
      },
      {path: 'config', component: HomeIndexComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(homeRouter)],
  exports: [RouterModule]
})
export class HomeRouterModule {
}
