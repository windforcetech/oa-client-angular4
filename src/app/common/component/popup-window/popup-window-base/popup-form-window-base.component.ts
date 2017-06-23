import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {CustomizeFormComponent} from '../../customize-form/customize-form.component';

@Component({template: ''})
export class PopupValidateFormWindowBaseComponent extends CustomizeFormComponent implements OnInit {
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

  ngOnInit(): void {
    super.ngOnInit();
  }
}
