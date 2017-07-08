/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRouter: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'demo', loadChildren: 'app/demo/demo.module#DemoModule'},
  {path: 'home', loadChildren: 'app/home/home.module#HomeModule'},
  {path: 'system', loadChildren: 'app/system/system.module#SystemModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRouter)],
  exports: [RouterModule]
})
export class AppRouterModule {
}
