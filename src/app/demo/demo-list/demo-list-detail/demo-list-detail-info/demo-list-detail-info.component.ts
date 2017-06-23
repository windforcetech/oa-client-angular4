import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-demo-list-detail-info',
  templateUrl: './demo-list-detail-info.component.html',
  styleUrls: ['./demo-list-detail-info.component.scss']
})
export class DemoListDetailInfoComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t['info-id']);
    })
  }
}
