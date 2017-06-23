import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appPopupWindow]'
})
export class PopupWindowDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
