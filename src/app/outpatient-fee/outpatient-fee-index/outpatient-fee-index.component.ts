import {Component, OnInit} from '@angular/core';
import {AddFeeComponent} from '../add-fee/add-fee.component';
import {ApplicationService} from '../../common/service/application.service';

@Component({
  selector: 'app-outpatient-fee-index',
  templateUrl: './outpatient-fee-index.component.html',
  styleUrls: ['./outpatient-fee-index.component.css']
})
export class OutpatientFeeIndexComponent implements OnInit {

  constructor(private app: ApplicationService) {
  }

  ngOnInit() {
  }

  onPopupClick() {
    this.app.frontLayer.openPopupWindow(AddFeeComponent, '新增患者1', 500, 400, null, false);
  }
}
