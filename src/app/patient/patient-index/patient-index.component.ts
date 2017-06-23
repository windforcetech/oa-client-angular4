import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomizeSliderService, ICustomizeSlider} from '../../common/service/customize-slider.service';

@Component({
  selector: 'app-patient-index',
  templateUrl: './patient-index.component.html',
  styleUrls: ['./patient-index.component.css']
})
export class PatientIndexComponent implements OnInit, AfterViewInit, ICustomizeSlider {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus = '';

  constructor(private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService) {
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  onChildRouterClick() {
    this.router.navigate([{outlets: {'patient-config': ['ready-test']}}], {relativeTo: this.route})
    this.slider.show(this, null);
  }

  onParentRouterClick() {
    this.router.navigate(['patient-list'], {relativeTo: this.route});
  }
}
