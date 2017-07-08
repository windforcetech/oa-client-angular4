import {Component, OnInit} from '@angular/core';
import {ICustomizeSlider, CustomizeSliderService} from '../../common/service/customize-slider.service';
import {ICenterHeaderComponent} from "../../common/component/center-header/center-header.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-large.component.html',
  styleUrls: ['./demo-large.component.css']
})
export class DemoLargeComponent implements OnInit, ICustomizeSlider, ICenterHeaderComponent {
  placeholder: string;
  moduleName: string;
  controlList: string[];

  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;


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


  constructor(private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService) {
    this.moduleName = '演示中心';
    this.controlList = ['添加', '删除']
  }

  ngOnInit() {
  }

  onSearch(val: string): void {
  }

  onClick(evt: Event) {
    this.router.navigate(['detail', 'dejuhng'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }


  changeTab(index) {
    console.log(index);
  }

  changeTab1(index) {
    console.log(index);
  }

  clickOpenPopup() {
    // this.app.frontLayer.openPopupWindow(HomeNoticeComponent, '新增患者1', 860, 600, null, false).subscribe(t => {
    // });
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
