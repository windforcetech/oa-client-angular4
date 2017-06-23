import {Component, OnInit, ViewChild} from '@angular/core';

import {FrontLayerComponent} from '../common/component/popup-window/front-layer/front-layer.component';
import {ApplicationService} from '../common/service/application.service';

@Component({
  selector: 'app-outpatient-fee-root',
  template: `
    <router-outlet></router-outlet>
    <app-front-layer #frontLayer></app-front-layer>`,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  `]
})
export class OutpatientFeeRootComponent implements OnInit {
  @ViewChild('frontLayer')
  frontLayer: FrontLayerComponent;

  constructor(private app: ApplicationService) {
  }

  ngOnInit() {
    this.app.frontLayer = this.frontLayer;
  }
}
