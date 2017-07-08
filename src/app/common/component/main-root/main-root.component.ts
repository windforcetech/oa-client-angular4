import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ApplicationService} from '../../service/application.service';
import {FrontLayerComponent} from '../popup-window/front-layer/front-layer.component';

@Component({
  selector: 'app-main-root',
  templateUrl: './main-root.component.html',
  styleUrls: ['./main-root.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainRootComponent implements OnInit {
  @ViewChild('frontLayer')
  frontLayer: FrontLayerComponent;

  constructor(private app: ApplicationService) {
  }

  ngOnInit() {
    this.app.frontLayer = this.frontLayer;
  }
}
