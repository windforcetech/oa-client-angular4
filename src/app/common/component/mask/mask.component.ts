import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.css']
})
export class MaskComponent implements OnInit {
  @Output()
  onMaskClick: EventEmitter<any> = new EventEmitter<any>();

  @HostBinding('attr.status')
  hostStatus = '';
  @HostBinding('style.display')
  hostDisplay = '';

  @HostListener('click')
  onClick() {
    this.onMaskClick.emit();
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  show() {
    this.hostDisplay = 'block';
    setTimeout(() => {
      this.hostStatus = 'show';
    }, 0);
  }

  hide() {
    this.hostStatus = 'hide';
    setTimeout(() => {
      this.hostDisplay = 'none';
    }, 200);
  }
}
