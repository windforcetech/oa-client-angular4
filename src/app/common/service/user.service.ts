/**
 * Created by KingKong on 2017/5/25.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {LocalStorageService, StorageType} from './local-storage.service';


@Injectable()
export class UserService {
  constructor(private http: Http, private storage: LocalStorageService) {
  }

  writeLocal(): Promise<boolean> {
    this.storage.open('LOGIN_STATE');
    this.storage.setStore('LOGIN_OK', 'TRUE', StorageType.SESSION);
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  getToken() {
  }

  checkToken() {
  }
}
