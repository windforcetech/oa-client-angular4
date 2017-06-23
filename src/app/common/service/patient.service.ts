/**
 * Created by KingKong on 2017/5/27.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PatientService {
  constructor(private http: Http) {
  }

  getPatientDetail(patientId): Observable<any> {
    return this.http.get('');
  }

}
