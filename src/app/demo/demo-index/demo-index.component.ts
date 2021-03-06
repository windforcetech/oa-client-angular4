import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AddPatientVO} from '../../common/vos/patient.vos';
import {DemoNoticeComponent} from '../popup/demo-notice/demo-notice.component';
import {ApplicationService} from '../../common/service/application.service';
import {ICenterHeaderComponent} from '../../common/component/center-header/center-header.component';

@Component({
  selector: 'app-home-index',
  templateUrl: './demo-index.component.html',
  styleUrls: ['./demo-index.component.css']
})
export class DemoIndexComponent implements OnInit, ICenterHeaderComponent {
  placeholder: string;
  moduleName: string;
  controlList: string[];

  formName = 'Patient';
  formControlList: string[] = null;
  formModel: AddPatientVO = new AddPatientVO();

  buttonGroupData = [
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: true},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: true},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: true},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: false},
    {title: 'gfhy', selected: true},
    {title: 'gfhy', selected: false}
  ];

  tabData = {
    data: ['选项', '选项卡2', '选项卡3测试', '选项卡4测试超长'],
    defaultIndex: 1,
    changeTab: (index) => {
      console.log(index);
    }
  };

  errorMessage = '用户名密码错误';
  dropdownList = [
    {key: '测试标题1', value: '1'},
    {key: '测试标题2', value: '2'},
    {key: '测试标题3', value: '3'},
    {key: '测试标题4', value: '4'},
    {key: '测试标题5', value: '5'},
    {key: '测试标题6', value: '6'}];

  constructor(public el: ElementRef, private router: Router, private route: ActivatedRoute, private app: ApplicationService) {
    this.formControlList = Object.keys(this.formModel);
  }

  onSearch(val: string): void {
  }
  ngOnInit() {
    this.moduleName = '演示中心'
  }

  changeTab(index) {
    console.log(index);
  }

  changeTab1(index) {
    console.log(index);
  }

  clickOpenPopup() {
    this.app.frontLayer.openPopupWindow(DemoNoticeComponent, '新增患者1', 480, 300, null, false).subscribe(t => {
    });
  }

  onIconClick(index) {
    console.log('点击图标的索引是' + index);
  }

  changeError() {
    this.errorMessage = '';
  }

  changeError1() {
    this.errorMessage = '用户名密码错误';
  }

  testNamedRouter() {
    this.router.navigate([{outlets: {'right-detail': ['detail']}}], {relativeTo: this.route.parent});
  }

  onRadioClick() {
    console.log('aaaaa');
  }
}
