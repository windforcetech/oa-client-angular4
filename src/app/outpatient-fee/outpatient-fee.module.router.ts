/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RightEmptyComponent} from '../common/component/right-empty/right-empty.component';

import {OutpatientFeeRootComponent} from './outpatient-fee.root.component';
import {OutpatientFeeIndexComponent} from './outpatient-fee-index/outpatient-fee-index.component';
import {OutpatientFeeDetailComponent} from './outpatient-fee-index/outpatient-fee-detail/outpatient-fee-detail.component';


const outpatientFeeRouter: Routes = [
  {
    path: '',
    component: OutpatientFeeRootComponent,
    children: [
      {
        path: '', redirectTo: 'index', pathMatch: 'full'
      },
      {
        path: 'index', component: OutpatientFeeIndexComponent, children: [
        {path: '', component: RightEmptyComponent},
        {path: 'outpatient-fee-detail', component: OutpatientFeeDetailComponent}
      ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(outpatientFeeRouter)],
  exports: [RouterModule]
})
export class OutpatientFeeRouterModule {
}
