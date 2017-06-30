/**
 * Created by KingKong on 2017/5/25.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';


@Injectable()
export class UserService {
  constructor(private http: Http) {
  }
}
