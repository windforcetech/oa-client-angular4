import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {MaskComponent} from './common/component/mask/mask.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  displayStatus: string;

  @ViewChild('mainMask')
  mainMask: MaskComponent;

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    /*
     const loginResult = this.service.readLocal();
     if (!loginResult || loginResult !== 'TRUE') {
     location.href = '/public/login.html';
     }*/
  }

  ngAfterViewInit(): void {
    // this.mainMask.show();
  }

  onLeftRouterLinkClick(event) {
    this.mainMask.show();
    // this.router.navigate([event], {relativeTo: this.route});
  }

  clickMask() {
    this.displayStatus = 'hide';
  }

  onShowLeftNav() {
    this.displayStatus = 'show';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.displayStatus !== 'hide') {
      this.displayStatus = 'hide';
    }
  }
}
