import {NgModule} from '@angular/core';

import {OutpatientFeeRouterModule} from './outpatient-fee.module.router';
import {CommonComponentModule} from '../common/component/common-component.module';

import {OutpatientFeeRootComponent} from './outpatient-fee.root.component';
import {OutpatientFeeIndexComponent} from './outpatient-fee-index/outpatient-fee-index.component';
import {OutpatientFeeDetailComponent} from './outpatient-fee-index/outpatient-fee-detail/outpatient-fee-detail.component';

import {AddFeeComponent} from './add-fee/add-fee.component';

@NgModule({
  imports: [
    OutpatientFeeRouterModule,
    CommonComponentModule
  ],
  declarations: [
    OutpatientFeeRootComponent,
    OutpatientFeeIndexComponent,
    OutpatientFeeDetailComponent,
    AddFeeComponent
  ],
  entryComponents: [
    AddFeeComponent
  ]
})
export class OutpatientFeeModule {
}
