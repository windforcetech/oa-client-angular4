import {
  AfterViewInit, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MaskComponent} from '../../mask/mask.component';
import {LoadingComponent} from '../../loading/loading.component';
import {PopupWindowDirective} from '../popup-window.directive';

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

  @ViewChild('fullMask')
  fullMask: MaskComponent;

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

  constructor(private factory: ComponentFactoryResolver) {
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

  open(componentRef: any, width: number, height: number, data?: any) {

    this.popupDataLoading.show();
    this.styleObject = {
      maxHeight: height + 'px',
      maxWidth: width + 'px',
      left: '50%',
      top: '50%',
      transform: 'translate(-' + (width / 2) + 'px, -' + (height / 2) + 'px)'
    };
    setTimeout(() => {
      this.popupDataLoading.hide(() => {
        let compo: any = this.viewContainerRef.createComponent(this.factory.resolveComponentFactory(componentRef));

        compo.instance['data'] = data;
        compo.instance['onParentClose'] = () => {
          this.onPopupClose.emit(null);
        };
      });
    }, 500);
  }
}
