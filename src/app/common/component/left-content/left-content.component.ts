import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-left-content',
  templateUrl: './left-content.component.html',
  styleUrls: ['./left-content.component.css']
})
export class LeftContentComponent implements OnInit {
  leftShowLoading: string;
  @Output()
  onRouterLinkClick = new EventEmitter<string>();
  @Output()
  onShowLeftNav = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
    this.leftShowLoading = 'show';
    setTimeout(() => {
      this.leftShowLoading = 'hide';
    }, 2000)
  }


  onButtonClick(routerLink: string) {
    this.onRouterLinkClick.emit('/' + routerLink);
  }

  showLeft() {
    this.onShowLeftNav.emit();
  }
}
