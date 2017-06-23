import {
  AfterViewInit, Component, ComponentFactoryResolver, ElementRef, HostBinding, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';

import {FrontLayerDirective} from '../front-layer.directive';
import {MaskComponent} from '../../mask/mask.component';
import {PopupWindowComponent} from '../popup-window/popup-window.component';
import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

@Component({
  selector: 'app-front-layer',
  templateUrl: './front-layer.component.html',
  styleUrls: ['./front-layer.component.css']
})
export class FrontLayerComponent implements OnInit, AfterViewInit {
  viewContainerRef: ViewContainerRef = null;

  @ViewChild(FrontLayerDirective)
  frontLayerDirective: FrontLayerDirective;

  @ViewChild('fullMask')
  fullMask: MaskComponent;

  @HostBinding('style.left')
  hostLeft = '';

  @HostBinding('style.top')
  hostTop = '';

  constructor(private el: ElementRef, private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.frontLayerDirective.viewContainerRef;
  }

  ngOnInit() {
  }

  openRollPanel(component: any, data: any, clearPrevious: boolean = false) {
  }

  public openPopupWindow(component: any,
                         componentName: string,
                         width: number,
                         height: number,
                         data: any,
                         clearPrevious: boolean = false): Observable<any> {
    this.el.nativeElement.style.left = 0;
    this.el.nativeElement.style.top = 0;

    if (clearPrevious) {
      this.viewContainerRef.remove();
    }

    return Observable.create((observer: Observer<any>) => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(PopupWindowComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      const popup = <PopupWindowComponent>componentRef.instance;
      popup.onPopupClose.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.el.nativeElement.style.left = '100%';
          this.el.nativeElement.style.top = '100%';
        }
      });
      popup.onPopupBack.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.el.nativeElement.style.left = '100%';
          this.el.nativeElement.style.top = '100%';
        }
      });
      popup.onReady.subscribe(() => {
        popup.open(component, width, height, data);
      });
      popup.popupWindowName = componentName || '';
    });
  }
}
