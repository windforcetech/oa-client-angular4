import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../common/component/popup-window/popup-window-base/popup-window-base.component';

@Component({
  selector: 'app-demo-notice',
  templateUrl: './demo-notice.component.html',
  styleUrls: ['./demo-notice.component.css']
})
export class DemoNoticeComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  clickClose() {
    this.close({msg: '我可以发送任何消息', title: '消息', index: 1000001});
  }

  clickSendMessage() {
    this.sendMessage({msg: '我可以发送任何消息', title: '消息', index: 1000000});
  }
}
