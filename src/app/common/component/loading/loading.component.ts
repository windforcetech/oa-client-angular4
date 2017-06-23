import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  maskOpacity = 0.6;
  maskColor = '#333333';

  iconWidth: number[] = [200, 150, 120, 100, 80, 60, 50, 40, 30, 20];
  iconHeight: number[] = [200, 150, 120, 100, 80, 60, 50, 40, 30, 20];

  loadingStyle: any = {};
  loadingImageSrc = '../../assets/images/loading-purple.png';

  _full = false;
  _padding = 0;
  _size = 6;

  @HostBinding('style.height')
  private hostHeight = '';
  @HostBinding('style.position')
  private hostPosition = '';
  @HostBinding('style.left')
  private hostLeft = 0;
  @HostBinding('style.top')
  private hostTop = 0;
  @HostBinding('style.padding')
  private hostPadding = '0';
  @HostBinding('style.opacity')
  private hostOpacity = 0;
  @HostBinding('style.display')
  private hostDisplay = 'none';
  @HostBinding('style.transition')
  private hostTransition = 'none';

  @Input()
  set color(value: string) {
    this.maskColor = value;
  }

  @Input()
  set opacity(value: number) {
    this.maskOpacity = value;
  }

  @Input()
  set skin(val: string) {
    switch (val) {
      case LoadingSkin.PURPLE:
        this.loadingImageSrc = '../../assets/images/loading-purple.png';
        break;
      case LoadingSkin.WHITE:
        this.loadingImageSrc = '../../assets/images/loading-white.png';
        break;
      default:
    }
  }

  @Input()
  set fullDisplay(val: boolean) {
    this._full = val;
    if (val) {
      this.hostHeight = '100%';
      this.hostPosition = 'absolute';
      this.hostLeft = 0;
      this.hostTop = 0;
    } else {
      this.hostPosition = 'relative';
      this.hostHeight = this._full ? '100%' : (this.iconWidth[this._size] + this._padding * 2) + 'px';
    }
  }

  @Input()
  set padding(val: number) {
    this.hostHeight = this._full ? '100%' : (this.iconWidth[this._size] + this._padding * 2) + 'px';
    this.hostPadding = val + 'px 0'
  }

  @Input()
  set iconSize(val: number) {
    if (val >= this.iconWidth.length) {
      val = this.iconWidth.length - 1;
    }
    this.hostHeight = this._full ? '100%' : (this.iconWidth[val] + this._padding * 2) + 'px';
    this.loadingStyle['width'] = this.iconWidth[val] + 'px';
    this.loadingStyle['height'] = this.iconHeight[val] + 'px';
    this.loadingStyle['transform'] = 'translate(-' + (this.iconWidth[val] / 2) + 'px,-' + (this.iconHeight[val] / 2) + 'px)';
  }

  @Input()
  showMask = false;

  ngOnInit(): void {
  }

  hide(callback) {
    this.hostOpacity = 0;
    this.hostTransition = 'opacity .1s';
    setTimeout(() => {
      this.hostDisplay = 'none';
      if (typeof callback === 'function') {
        callback();
      }
    }, 150);
  }

  show() {
    this.hostOpacity = 0;
    this.hostDisplay = 'block';
    setTimeout(() => {
      this.hostOpacity = 1;
      this.hostTransition = 'opacity .1s';
    }, 100);
  }
}
export class LoadingSkin {
  static WHITE = 'WHITE';
  static PURPLE = 'PURPLE';
}
