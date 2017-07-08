import {
  AfterViewChecked, AfterViewInit, Component, HostListener, OnInit, ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MainService} from "./common/service/main.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  // 左栏滑出遮罩
  displayNavStatus: string;
  // 全屏遮罩
  displayMainStatus: string;
  mainShowLoading: string;

  // 左栏菜单数据
  navData: any;
  hospitalName: string;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) {
  }

  ngOnInit(): void {
    /*
     const loginResult = this.service.readLocal();
     if (!loginResult || loginResult !== 'TRUE') {
     location.href = '/public/login.html';
     }*/
    setTimeout(() => {
      this.mainShowLoading = 'show';
      setTimeout(() => {
        this.mainShowLoading = 'hide';
      }, 1000);
    }, 100);
    this.mainService.getMainConfig().subscribe(t => {
      this.hospitalName = t.hospitalName;
    });

    this.mainService.getLeftNav().subscribe(t => this.navData = t);
  }

  onLeftRouterLinkClick(event) {
    this.router.navigate([event], {relativeTo: this.route});
  }

  clickNavMask() {
    this.displayNavStatus = 'hide';
  }

  clickMainMask() {
    this.displayMainStatus = 'hide';
  }

  onShowLeftNav() {
    this.displayNavStatus = 'show';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.displayNavStatus !== 'hide') {
      this.displayNavStatus = 'hide';
    }
  }
}
