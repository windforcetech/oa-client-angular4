import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AddPatientComponent} from '../add-patient/add-patient.component';
import {CenterHeaderComponent} from '../../common/component/center-header/center-header.component';
import {ApplicationService} from '../../common/service/application.service';
import {CustomizeSliderService, ICustomizeSlider} from '../../common/service/customize-slider.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, ICustomizeSlider {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  constructor(private router: Router, private route: ActivatedRoute, private app: ApplicationService, private slider: CustomizeSliderService) {
  }

  ngOnInit() {
  }

  onChildRouterClick() {
    this.app.frontLayer.openPopupWindow(AddPatientComponent, '新增患者', 500, 400, null, false);
    this.app.frontLayer.openPopupWindow(CenterHeaderComponent, '增患者', 500, 400, null, false);
  }

  onParentRouterClick() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
