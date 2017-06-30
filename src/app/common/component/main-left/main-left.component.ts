import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-main-left',
  templateUrl: './main-left.component.html',
  styleUrls: ['./main-left.component.css']
})
export class MainLeftComponent implements OnInit {
  leftShowLoading: string;

  @Output()
  onRouterLinkClick = new EventEmitter<string>();

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
}
