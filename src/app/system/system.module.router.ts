/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MainRootComponent} from '../common/component/main-root/main-root.component';

import {SystemIndexComponent} from './system-index/system-index.component';

const systemRouter: Routes = [
  {
    path: '',
    component: MainRootComponent,
    children: [
      {path: '', redirectTo: 'index', pathMatch: 'full'},
      {path: 'index', component: SystemIndexComponent}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(systemRouter)],
  exports: [RouterModule]
})
export class SystemRouterModule {
}
