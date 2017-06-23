import {Component, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-relative-select',
  templateUrl: './relative-select.component.html',
  styleUrls: ['./relative-select.component.css'],
  animations: [
    trigger('heightFadeIn', [
      state('in', style({transform: 'scaleY(0)'})),
      state('out', style({transform: 'scaleY(1)'})),
      transition('in => out', animate('120ms')),
      transition('out => in', animate('120ms'))
    ])]
})
export class RelativeSelectComponent implements OnInit {
  _dataList: { [key: string]: string[] } = null;
  leftList: string[] = null;
  rightList: string[] = null;

  rightIndex = 0;

  text = '';
  status = 'in';
  maskState = 'none';

  @Input()
  selectIndex = 0;

  @Input()
  placeholder = '';

  @Output()
  value = null;

  @Input()
  set dataList(val: { [key: string]: string[] }) {
    this._dataList = val;
    this.leftList = Object.keys(val);
  }

  constructor() {
  }

  ngOnInit() {
  }

  changeStatus() {
    if (this.status === 'in') {
      this.status = 'out';
      this.maskState = 'block';
    } else {
      this.status = 'in';
      this.maskState = 'none';
    }
  }

  onLeftClick(item, index) {
    this.rightList = this._dataList[item];
    this.selectIndex = index;
  }

  onRightClick(index) {
    this.rightIndex = index;
    this.text = this.rightList[index];
    this.changeStatus();
  }
}
