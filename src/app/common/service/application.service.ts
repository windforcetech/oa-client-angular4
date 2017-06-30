import {Injectable} from '@angular/core';
import {FrontLayerComponent} from '../component/popup-window/front-layer/front-layer.component';
import {MaskComponent} from "../component/mask/mask.component";

@Injectable()
export class ApplicationService {
  private currentFrontLayer: FrontLayerComponent = null;
  private currentWorkModule: any = null;
  private currentMainMask: MaskComponent = null;

  set frontLayer(val: FrontLayerComponent) {
    this.currentFrontLayer = val;
  }

  get frontLayer(): FrontLayerComponent {
    return this.currentFrontLayer;
  }

  set maskLayer(val: MaskComponent) {
    this.currentMainMask = val;
  }

  get maskLayer(): MaskComponent {
    return this.currentMainMask;
  }
}
