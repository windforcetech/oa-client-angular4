import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ICustomizeSlider, CustomizeSliderService} from '../../common/service/customize-slider.service';
import {ICenterHeaderComponent} from '../../common/component/center-header/center-header.component';
import {DemoNoticeComponent} from '../popup/demo-notice/demo-notice.component';
import {ApplicationService} from '../../common/service/application.service';


@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.css']
})
export class DemoListComponent implements OnInit, ICustomizeSlider, ICenterHeaderComponent {
  placeholder: string;
  moduleName: string;
  controlList: string[];
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  currWidth: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService) {
  }

  ngOnInit() {
    this.moduleName = '演示中心';
  }

  onSearch(val: string): void {
    console.log(val);
  }

  onShowPrompt() {
  }

  onClick(evt: Event) {
    this.router.navigate(['detail', '9586735452373456'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  onPopupWindow(event) {
    this.application.frontLayer.openPopupWindow(DemoNoticeComponent, '弹窗测试', 860, 480, null, false).subscribe(t => {
      console.log(t);
    })
  }

  toggleSelected = 0;

  toggleClick(index) {
    this.toggleSelected = index;
  }
}
