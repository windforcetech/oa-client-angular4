import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {CustomizeFormComponent} from '../../common/component/customize-form/customize-form.component';
import {AddPatientVO} from '../../common/vos/patient.vos';
import {HomeNoticeComponent} from '../home-notice/home-notice.component';
import {ApplicationService} from '../../common/service/application.service';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent extends CustomizeFormComponent implements OnInit {
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
    super(el);
    this.formControlList = Object.keys(this.formModel);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  changeTab(index) {
    console.log(index);
  }

  changeTab1(index) {
    console.log(index);
  }

  clickOpenPopup() {
    this.app.frontLayer.openPopupWindow(HomeNoticeComponent, '新增患者1', null, false).subscribe(t => {
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
}
