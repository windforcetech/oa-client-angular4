import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appFrontLayer]'
})
export class FrontLayerDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
