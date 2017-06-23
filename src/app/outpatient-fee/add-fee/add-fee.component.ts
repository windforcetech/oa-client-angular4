import {Component, OnInit} from '@angular/core';
import {OutpatientFeeDetailComponent} from '../outpatient-fee-index/outpatient-fee-detail/outpatient-fee-detail.component';

@Component({
  selector: 'app-add-fee',
  templateUrl: './add-fee.component.html',
  styleUrls: ['./add-fee.component.css']
})
export class AddFeeComponent extends OutpatientFeeDetailComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
