import {Component, EventEmitter, Output} from '@angular/core';

@Component({template: ''})
export class PopupWindowBaseComponent {
  @Output()
  public onReady: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onSend: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  public onClose: EventEmitter<any> = new EventEmitter<any>();

  ready(data?: any) {
    this.onReady.emit(data);
  }

  sendMessage(data: any) {
    this.onSend.emit(data);
  }

  close(data?: any) {
    this.onClose.emit(data);
  }
}
