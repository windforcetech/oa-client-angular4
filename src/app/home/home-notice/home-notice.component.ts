import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../common/component/popup-window/popup-window-base/popup-window-base.component';

@Component({
  selector: 'app-home-notice',
  templateUrl: './home-notice.component.html',
  styleUrls: ['./home-notice.component.css']
})
export class HomeNoticeComponent extends PopupWindowBaseComponent implements OnInit {

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
