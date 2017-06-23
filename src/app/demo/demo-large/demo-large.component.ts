import {Component, OnInit} from '@angular/core';
import {ICustomizeSlider, CustomizeSliderService} from '../../common/service/customize-slider.service';
import {ICenterHeaderComponent} from "../../common/component/center-header/center-header.component";

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-large.component.html',
  styleUrls: ['./demo-large.component.css']
})
export class DemoLargeComponent implements OnInit, ICustomizeSlider, ICenterHeaderComponent {
  moduleName: string;
  controlList: string[];


  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  constructor(private slider: CustomizeSliderService) {
    this.moduleName = '演示中心';
    this.controlList = ['添加', '删除']
  }

  ngOnInit() {
  }

  onClick(evt: Event) {
    this.slider.show(this, evt);
  }
}
