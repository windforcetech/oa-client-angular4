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
  onClose = new EventEmitter();
  @Output()
  onBack = new EventEmitter();
  @Output()
  onControl = new EventEmitter<number>();

  moreListStatus: string;

  constructor(private el: ElementRef) {
    this.moreListStatus = 'hide';
  }

  clickMoreList(event) {
    this.moreListStatus = (this.moreListStatus === 'show') ? 'hide' : 'show';
  }

  @HostListener('click', ['$event'])
  onRightHeaderClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  onClickMoreMask(evt) {
    evt.stopPropagation();
    this.moreListStatus = 'hide';
  }

  moreItemClick(evt, index) {
    evt.stopPropagation();
    this.moreListStatus = 'hide';
    this.onControl.emit(index);
  }

  onRightMoreCtrl(evt) {
    evt.stopPropagation();
    this.moreListStatus = 'hide';
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

export declare interface IRightHeaderComponent {
  componentName: string;
  controlList: string[];

  onClose(): void;
  onBack(): void;
  onControl(val: number): void;
}
