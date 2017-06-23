import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IRightHeaderComponent} from '../../../../common/component/right-header/right-header.component';

@Component({
  selector: 'app-demo-list-detail-info',
  templateUrl: './demo-list-detail-info.component.html',
  styleUrls: ['./demo-list-detail-info.component.css']
})
export class DemoListDetailInfoComponent implements OnInit, IRightHeaderComponent {
  componentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t['info-id']);
    })
  }
}
