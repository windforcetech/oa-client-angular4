import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver, ComponentRef,
  HostBinding, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {FrontLayerDirective} from '../front-layer.directive';
import {PopupWindowComponent} from '../popup-window/popup-window.component';
import {PopupConfirmComponent} from "../popup-confirm/popup-confirm.component";


@Component({
  selector: 'app-front-layer',
  templateUrl: './front-layer.component.html',
  styleUrls: ['./front-layer.component.css'],
  styles: []
})
export class FrontLayerComponent implements OnInit, AfterViewInit, OnDestroy {
  viewContainerRef: ViewContainerRef = null;
  childCount: number;

  @HostBinding('attr.status')
  displayStatus = 'hide';

  @ViewChild(FrontLayerDirective)
  frontLayerDirective: FrontLayerDirective;

  constructor(private factory: ComponentFactoryResolver) {
    this.childCount = 0;
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.frontLayerDirective.viewContainerRef;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.viewContainerRef.clear()
  }

  public openConfirmDialog(message: string): Observable<boolean> {
    return Observable.create((observer: Observer<boolean>) => {
      const componentFactory = this.factory.resolveComponentFactory(PopupConfirmComponent);
      const componentRef: ComponentRef<PopupConfirmComponent> = this.viewContainerRef.createComponent(componentFactory);
      const popupConfirm: PopupConfirmComponent = <PopupConfirmComponent>componentRef.instance;
      popupConfirm.setPopupWindowIndex(++this.childCount);
      popupConfirm.setConfirmMessage(message);
      popupConfirm.onClose.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.displayStatus = 'hide';
          }
          observer.next(null);
        });
      });
      popupConfirm.onCancel.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.displayStatus = 'hide';
          }
          observer.next(false);
        });
      });
      popupConfirm.onReady.subscribe(() => {
        popupConfirm.show();
      });
      popupConfirm.onConfirm.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.displayStatus = 'hide';
          }
          observer.next(true);
        });
      });
    });
  }

  public openPopupWindow(component: any,
                         componentName: string,
                         width: number,
                         height: number | string,
                         data?: any,
                         clearPrevious: boolean = false): Observable<any> {
    if (clearPrevious) {
      this.viewContainerRef.remove();
    }

    if (this.viewContainerRef.length === 0) {
      this.displayStatus = 'show';
    }

    return Observable.create((observer: Observer<any>) => {
      const componentFactory = this.factory.resolveComponentFactory(PopupWindowComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);

      const popup = <PopupWindowComponent>componentRef.instance;
      popup.setPopupWindowIndex(++this.childCount);
      popup.setPopupWindowName(componentName || '');
      popup.onPopupClose.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.displayStatus = 'hide';
        }
        observer.next({type: 'close', data: t || null});
      });
      popup.onPopupBack.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.displayStatus = 'hide';
        }
        observer.next(null);
      });
      popup.onReady.subscribe(t => {
        observer.next(t);
      });
      popup.onOwnReady.subscribe(() => {
        popup.open(component, width, height, data).subscribe(t => {
          observer.next(t);
        });
      });
    });

  }
}
