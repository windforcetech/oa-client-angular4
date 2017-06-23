import {Injectable} from '@angular/core';
import {FrontLayerComponent} from '../component/popup-window/front-layer/front-layer.component';

@Injectable()
export class ApplicationService {
  private currentFrontLayer: FrontLayerComponent = null;
  private currentWorkModule: any = null;

  set frontLayer(val: FrontLayerComponent) {
    this.currentFrontLayer = val;
  }

  get frontLayer(): FrontLayerComponent {
    return this.currentFrontLayer;
  }
}
