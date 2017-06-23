import {AfterViewInit, Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {PatientService} from '../../common/service/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit, AfterViewInit {
  detailData = null;

  constructor(private router: Router, private route: ActivatedRoute, private service: PatientService, private el: ElementRef) {
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  ngAfterViewInit(): void {
    // GlobalSubscriber.fire(TOP_ROLL_COMPONENT_COMPLETE);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(t => {
      this.service.getPatientDetail(t.patientId).subscribe(val => {
        this.detailData = val;
      });
    });
  }

  sdf(event) {
    // GlobalSubscriber.fire(TOP_ROLL_COMPONENT_CLOSE, event);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
