import {
  AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MaskComponent} from '../../mask/mask.component';
import {LoadingComponent} from '../../loading/loading.component';
import {PopupWindowDirective} from '../popup-window.directive';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit, AfterViewInit {
  viewContainerRef: ViewContainerRef;
  styleObject: any = {};

  @Input()
  popupWindowName = '';

  @ViewChild('popupDataLoading')
  popupDataLoading: LoadingComponent;

  @ViewChild(PopupWindowDirective)
  popupWindowDirective: PopupWindowDirective;

  @Output()
  onPopupClose = new EventEmitter<any>();
  @Output()
  onPopupBack = new EventEmitter<any>();
  @Output()
  onReady = new EventEmitter<any>();
  @Output()
  onOwnReady = new EventEmitter();

  constructor(private factory: ComponentFactoryResolver) {
  }

  setPopupWindowName(val) {
    this.popupWindowName = val;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.popupWindowDirective.viewContainerRef;
    this.onReady.emit(null);
  }

  onCloseClick() {
    this.onPopupClose.emit(null);
  }

  onBackClick() {
    this.onPopupBack.emit(null);
  }

  open(componentRef: any, width: number, height: number | string, data?: any) {

    this.popupDataLoading.show();
    this.styleObject = {
      maxWidth: width + 'px',
      width: 'calc(100% - 160px)'
    };
    if (typeof height !== 'string') {
      this.styleObject['maxHeight'] = height + 'px';
      this.styleObject['height'] = 'calc(100% - 160px)';
    }
    console.log(this.styleObject);
    return Observable.create((observer: Observer<any>) => {
      const compo: any = this.viewContainerRef.createComponent(this.factory.resolveComponentFactory(componentRef));

      compo.instance.onReady.subscribe(t => {
        this.onReady.emit((t && {type: 'ready', data: t}) || null);
      });
      compo.instance.onSend.subscribe(t => {
        observer.next({type: 'send', data: t});
      });
      compo.instance.onClose.subscribe(t => {
        // debugger
        this.onPopupClose.emit((t && {type: 'close', data: t}) || null);
      });
      compo.instance.data = data;
    });
  }
}
