import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-right-header',
  templateUrl: './right-header.component.html',
  styleUrls: ['./right-header.component.css']
})
export class RightHeaderComponent implements OnInit {
  @Input()
  componentName: string;

  @Input()
  controlList: string[];

  @Output()
  onClose = new EventEmitter<any>();

  @Output()
  onBack = new EventEmitter<any>();

  @Output()
  onControl = new EventEmitter<any>();

  rightMoreList: any = {};
  rightCtrlShow: any = {overflow: 'hidden'};
  showMoreList: boolean = false;

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  onClickMoreMask(evt) {
    evt.stopPropagation();
    this.rightMoreList = {
      height: 0,
      paddingTop: '0',
      paddingBottom: '0',
      transition: 'height .2s, padding-top .2s, padding-bottom .2s'
    };
    setTimeout(() => {
      this.rightCtrlShow.overflow = 'hidden';
    }, 200);
    this.showMoreList = false;
  }

  moreItemClick(evt, index) {
    evt.stopPropagation();
    this.onControl.emit(index);
  }

  onRightMoreCtrl(evt) {
    evt.stopPropagation();

    if (this.showMoreList) {

      this.rightMoreList = {
        height: 0,
        paddingTop: '0 !important',
        paddingBottom: '0 !important',
        transition: 'height .2s, padding-top .2s, padding-bottom .2s'
      };
      setTimeout(() => {
        this.rightCtrlShow.overflow = 'hidden';
      }, 200);
    }
    else {
      this.rightCtrlShow.overflow = 'visible';
      this.rightMoreList = {
        height: (this.controlList.length * 1.6 + 1) + 'rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
        transition: 'height .2s, padding-top .2s, padding-bottom .2s'
      };
    }

    this.showMoreList = !this.showMoreList
  }

  ngOnInit() {
  }

  onRightContainerClose(evt) {
    this.onClose.emit(evt);
  }

  onRightContainerBack(evt) {
    this.onBack.emit(evt);
  }

}
