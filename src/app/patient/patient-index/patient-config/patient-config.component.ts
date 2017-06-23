import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-patient-config',
  templateUrl: './patient-config.component.html',
  styleUrls: ['./patient-config.component.css']
})
export class PatientConfigComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  onTestClick() {
    Promise.reject({msg: '我是个信息，不知道谁能收到'});
  }
}
