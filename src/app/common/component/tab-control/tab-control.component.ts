import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tab-control',
  templateUrl: './tab-control.component.html',
  styleUrls: ['./tab-control.component.css']
})
export class TabControlComponent implements OnInit {
  @Input()
  tabData: string[] = null;
  @Input()
  defaultSelectedIndex = 0;

  @Input()
  theme = 1;

  @Output()
  onTabIndexChange = new EventEmitter<{ [key: string]: string }>();

  constructor() {
  }

  ngOnInit() {
  }

  selectTabIndex(index) {
    this.defaultSelectedIndex = index;
    this.onTabIndexChange.emit({index: index, title: this.tabData[index]});
  }
}
