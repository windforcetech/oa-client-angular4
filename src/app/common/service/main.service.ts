/**
 * Created by KingKong on 2017/5/25.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {LocalStorageService, StorageType} from './local-storage.service';
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
@Injectable()
export class MainService {
  constructor(private http: Http, private storage: LocalStorageService) {
  }

  writeLocal(): Promise<boolean> {
    this.storage.open('LOGIN_STATE');
    this.storage.setStore('LOGIN_OK', 'TRUE', StorageType.SESSION);
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  readLocal(): any {
    this.storage.open('LOGIN_STATE');
    return this.storage.getStore('LOGIN_OK', StorageType.SESSION);
  }

  getToken() {
  }

  checkToken() {
  }

  getMainConfig(): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      observer.next({hospitalName: '请输入医院名'});
    });
  }

  getLeftNav(): Observable<MenuItem[]> {
    return Observable.create((observer: Observer<MenuItem[]>) => {
      observer.next([
        {title: '门诊首页', link: 'home', icon: 'icon-homepage', subItems: []},
        {title: '门诊收费', link: 'outpatient-fee', icon: 'icon-fee', subItems: []},
        {title: '患者管理', link: 'patient', icon: 'icon-patient', subItems: []},
        {title: '预约管理', link: 'schedule', icon: 'icon-schedule', subItems: []},
        {
          title: '短信管理', link: '', icon: 'icon-sms', subItems: [
          {title: '发短信', link: 'sms-send'},
          {title: '短信回复', link: 'sms-reply'},
          {title: '发送记录', link: 'sms-send-log'},
          {title: '通讯录', link: 'contacts-book'},
          {title: '充值查询', link: 'recharge-query'},
          {title: '短信模版', link: 'sms-template'}]
        },
        {title: '系统管理', link: 'system', icon: 'icon-system', subItems: []},
        {title: '回访', link: 'feedback', icon: 'icon-feedback', subItems: []},
        {
          title: '充值', link: 'recharge', icon: 'icon-recharge', subItems: [
          {title: '充值', link: 'recharge/create-recharge'},
          {title: '充值记录', link: 'recharge/recharge-list'},
          {title: '充值账户', link: 'recharge/recharge-account-list'}]
        },
        {title: '演示', link: 'demo', icon: 'icon-demo', subItems: []},
      ])
    });
  }
}

export class MenuItem {
  title: string;
  link: string;
  icon: string;
  subItems: MenuSubItem[];
}
export class MenuSubItem {
  title: string;
  link: string;
}
