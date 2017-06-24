import {
  AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {PopupWindowDirective} from '../popup-window.directive';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit, AfterViewInit {
  displayStatus;
  popupWindowName = '';
  viewContainerRef: ViewContainerRef;

  @ViewChild(PopupWindowDirective)
  popupWindowDirective: PopupWindowDirective;

  @HostBinding('style.zIndex')
  hostZIndex: number;

  @Output()
  onPopupClose = new EventEmitter<any>();
  @Output()
  onPopupBack = new EventEmitter<any>();
  @Output()
  onReady = new EventEmitter<any>();
  @Output()
  onOwnReady = new EventEmitter();

  constructor(private factory: ComponentFactoryResolver, private el: ElementRef) {
  }

  setPopupWindowName(val) {
    this.popupWindowName = val;
  }

  setPopupWindowIndex(index) {
    this.hostZIndex = index;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.popupWindowDirective.viewContainerRef;
    this.onReady.emit(null);
    this.onOwnReady.emit();
  }

  onCloseClick() {
    this.onPopupClose.emit(null);
  }

  onBackClick() {
    this.onPopupBack.emit(null);
  }

  open(componentRef: any, width: number, height: number | string, data?: any) {
    const maxWidth = width + 'px';
    const currWidth = 'calc(100% - 160px)';
    let maxHeight = 'calc(100% - 160px)', currHeight = 'auto';
    if (typeof height !== 'string') {
      maxHeight = height + 'px';
      currHeight = 'calc(100% - 160px)';
    }
    const element:HTMLDivElement = <HTMLDivElement>this.el.nativeElement.querySelector('.popup-window');
    element.style.maxWidth = maxWidth;
    element.style.width = currWidth;
    element.style.maxHeight = maxHeight;
    element.style.height = currHeight;

    return Observable.create((observer: Observer<any>) => {
      const compo: any = this.viewContainerRef.createComponent(this.factory.resolveComponentFactory(componentRef));
      compo.instance.onReady.subscribe(t => {
        this.onReady.emit((t && {type: 'ready', data: t}) || null);
      });
      compo.instance.onSend.subscribe(t => {
        observer.next({type: 'send', data: t});
      });
      compo.instance.onOpenChild.subscribe(t => {
        this.displayStatus = 'show';
      });
      compo.instance.onCloseChild.subscribe(t => {
        this.displayStatus = 'hide';
      });
      compo.instance.onClose.subscribe(t => {
        // debugger
        this.onPopupClose.emit((t && {type: 'close', data: t}) || null);
      });
      compo.instance.data = data;
    });
  }
}
