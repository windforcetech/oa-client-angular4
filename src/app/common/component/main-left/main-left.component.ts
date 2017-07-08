import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {MenuItem} from "../../service/main.service";

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.component.html',
  styleUrls: ['./main-left.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainLeftComponent implements OnInit, AfterViewInit {
  leftShowLoading: string;
  currOpenedModule: number;
  private _navData: MenuItem[];

  @Input()
  hospitalName: string;

  @Input()
  set navData(value: MenuItem[]) {
    this._navData = value;
  }

  get navData(): MenuItem[] {
    return this._navData;
  }

  @Output()
  onRouterLinkClick = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //this.leftShowLoading = 'show';
  }

  onMainMenuClick(event, index, name) {
    this.currOpenedModule = index;
  }

  onSubMenuClick(event, index, name) {
  }

  onButtonClick(routerLink: string) {
    this.onRouterLinkClick.emit('/' + routerLink);
  }
}
