/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainRootComponent} from '../common/component/main-root/main-root.component';

import {HomeIndexComponent} from './home-index/home-index.component';

const homeRouter: Routes = [{
  path: '',
  component: MainRootComponent,
  children: [{path: '', component: HomeIndexComponent}]
}];
@NgModule({
  imports: [RouterModule.forChild(homeRouter)],
  exports: [RouterModule]
})
export class HomeRouterModule {
}
