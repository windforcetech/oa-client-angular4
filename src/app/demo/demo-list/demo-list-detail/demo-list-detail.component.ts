import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {IRightHeaderComponent} from '../../../common/component/right-header/right-header.component';
import {CustomizeSliderService, ICustomizeSlider} from '../../../common/service/customize-slider.service';


@Component({
  selector: 'app-demo-list-detail',
  templateUrl: './demo-list-detail.component.html',
  styleUrls: ['./demo-list-detail.component.css']
})
export class DemoListDetailComponent implements OnInit, IRightHeaderComponent, ICustomizeSlider {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;
  componentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor(private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService) {
  }

  ngOnInit() {
    this.componentName = '侧滑演示';
    this.controlList = ['删除', '编辑'];
    this.route.params.subscribe(t => {
      console.log(t['detail-id']);
    })
  }

  clickSecondRouter(event) {
    this.router.navigate(['detail-info', '95867354'], {relativeTo: this.route});
    this.slider.show(this, event);
  }
}
