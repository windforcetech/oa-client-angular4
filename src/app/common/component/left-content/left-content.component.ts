import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-left-content',
  templateUrl: './left-content.component.html',
  styleUrls: ['./left-content.component.css']
})
export class LeftContentComponent {
  @Output()
  onRouterLinkClick = new EventEmitter<string>();
  @Output()
  onShowLeftNav = new EventEmitter();

  constructor() {
  }

  onButtonClick(routerLink: string) {
    this.onRouterLinkClick.emit('/' + routerLink);
  }

  showLeft() {
    this.onShowLeftNav.emit();
  }
}
