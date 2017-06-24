import {AfterViewInit, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }
}

export declare  interface ILoadingComponent {
  showLoadingStatus: string;
}
