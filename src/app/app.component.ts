import {AfterViewInit, Component, HostListener, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, AfterViewInit {
  displayStatus: string;
  mainShowLoading: string;

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
    this.mainShowLoading = 'show';

    setTimeout(() => {
      this.mainShowLoading = 'hide';
    }, 1000);
  }

  onLeftRouterLinkClick(event) {
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
