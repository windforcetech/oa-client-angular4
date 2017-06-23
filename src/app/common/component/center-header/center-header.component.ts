/**
 * Created by KingKong on 2017/6/8.
 */
import {Input, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-center-header',
  templateUrl: './center-header.component.html',
  styleUrls: ['./center-header.component.css']
})
export class CenterHeaderComponent implements OnInit {
  @Input()
  moduleName: string;

  @Input()
  controlList: string[];

  constructor() {
  }

  ngOnInit(): void {
  }

  onControlClick(index) {

  }
}

export declare interface ICenterHeaderComponent {
  moduleName: string;
  controlList: string[];
}
