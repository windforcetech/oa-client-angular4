import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../common/component/popup-window/popup-window-base/popup-window-base.component";

@Component({
  selector: 'app-demo-no-button-popup',
  templateUrl: './demo-no-button-popup.component.html',
  styleUrls: ['./demo-no-button-popup.component.css']
})
export class DemoNoButtonPopupComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
