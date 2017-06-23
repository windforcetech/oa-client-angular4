import {Component, OnInit} from '@angular/core';
import {ICustomizeSlider, CustomizeSliderService} from '../../common/service/customize-slider.service';

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.css']
})
export class DemoListComponent implements OnInit, ICustomizeSlider {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  constructor(private slider: CustomizeSliderService) {
  }

  ngOnInit() {
  }

  onLeftShow() {
  }

  onClick(evt: Event) {
    this.slider.show(this, evt);
  }
}
