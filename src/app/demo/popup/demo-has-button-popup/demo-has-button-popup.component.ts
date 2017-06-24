import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../common/component/popup-window/popup-window-base/popup-window-base.component";

@Component({
  selector: 'app-demo-popup',
  templateUrl: './demo-has-button-popup.component.html',
  styleUrls: ['./demo-has-button-popup.component.css']
})
export class DemoHasButtonPopupComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {

  }
}
