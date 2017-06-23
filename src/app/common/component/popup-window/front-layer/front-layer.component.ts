import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ElementRef, HostBinding,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {FrontLayerDirective} from '../front-layer.directive';
import {PopupWindowComponent} from '../popup-window/popup-window.component';


@Component({
  selector: 'app-front-layer',
  templateUrl: './front-layer.component.html',
  styleUrls: ['./front-layer.component.css']
})
export class FrontLayerComponent implements OnInit, AfterViewInit {
  viewContainerRef: ViewContainerRef = null;

  @HostBinding('attr.status')
  displayStatus = 'hide';

  @ViewChild(FrontLayerDirective)
  frontLayerDirective: FrontLayerDirective;

  constructor(private factory: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.frontLayerDirective.viewContainerRef;
  }

  ngOnInit() {
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

    this.displayStatus = 'show';

    return Observable.create((observer: Observer<any>) => {
      const componentFactory = this.factory.resolveComponentFactory(PopupWindowComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      const popup = <PopupWindowComponent>componentRef.instance;
      popup.setPopupWindowName(componentName || '');
      popup.onPopupClose.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.displayStatus = 'hide';
        }
        observer.next(t || null);
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
