import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styles: [`
    :host {
      width: 100%;
      height: 100%;
      display: none;
      position: absolute;
      left: 0;
      top: 0;
    }
  `]
})
export class MaskComponent implements OnInit {
  @Output()
  onMaskClick: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('attr.status')
  status = '';

  @HostBinding('style.display')
  hostDisplay = '';
  @HostBinding('style.opacity')
  hostOpacity = 0;

  @HostBinding('style.zIndex') @Input()
  zIndex = -1;

  @HostListener('click')
  onClick() {
    this.onMaskClick.emit();
  }


  @Input()
  type: MaskType;

  constructor() {
  }

  ngOnInit(): void {
  }

  setBackMask() {
    this.zIndex = -1;
  }

  setFrontMask() {
    this.zIndex = 999999999;
  }

  show() {
    this.hostDisplay = 'block';
    this.hostOpacity = 0;
    setTimeout(() => {
      this.status = 'show';
    }, 0);
  }

  hide() {
    this.status = 'hide';
    setTimeout(() => {
      this.hostDisplay = 'none';
      this.hostOpacity = 0;
    }, 5000);
  }
}

export enum MaskType {
  FRONT, BACK
}
