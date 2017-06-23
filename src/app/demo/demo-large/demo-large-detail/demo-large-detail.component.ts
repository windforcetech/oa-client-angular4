import {Component, OnInit} from '@angular/core';
import {IRightHeaderComponent} from '../../../common/component/right-header/right-header.component';

@Component({
  selector: 'app-demo-list-detail',
  templateUrl: './demo-large-detail.component.html',
  styleUrls: ['./demo-large-detail.component.css']
})
export class DemoLargeDetailComponent implements OnInit, IRightHeaderComponent {
  componentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor() {
  }

  ngOnInit() {
  }

}
