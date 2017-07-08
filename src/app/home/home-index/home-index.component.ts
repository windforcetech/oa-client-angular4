import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {InputIcon} from '../../common/component/icon-input/icon-input.component';
import {SelectButtonStatus} from '../../common/component/select-button-group/select-button-group.component';

@Component({
  selector: 'app-home-index',
  templateUrl: './home-index.component.html',
  styleUrls: ['./home-index.component.css']
})
export class HomeIndexComponent implements OnInit {
  iconList: InputIcon[];
  selectButtonList: SelectButtonStatus[];
  selectedButtonList: SelectButtonStatus[];

  ngOnInit() {
    this.iconList = [{icon: 'tf', color: '#ff0000'}];
    this.selectButtonList =
      [
        {title: '根管治疗', value: '1'},
        {title: '根管治疗', value: '2'},
        {title: '根管治疗', value: '3'},
        {title: '根管治疗', value: '4'},
        {title: '根管治疗', value: '5'},
        {title: '根管治疗', value: '6'},
        {title: '根管治疗', value: '7'},
        {title: '根管治疗', value: '8'},
        {title: '根管治疗', value: '9'},
        {title: '根管治疗', value: '10'},
        {title: '根管治疗根管', value: '11'},
        {title: '根管疗', value: '12'},
        {title: '根管治疗', value: '13'},
        {title: '根管治疗', value: '14'},
        {title: '根管治疗', value: '15'},
        {title: '根管治疗', value: '16'}]
  }

  showData(): void {
    this.selectedButtonList = Array.from(this.selectedButtonList);
  }

}
