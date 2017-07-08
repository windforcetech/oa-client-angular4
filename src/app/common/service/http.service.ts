/**
 * Created by bingq on 2017/5/26.
 */
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {InterceptorService} from 'ng2-interceptors';

import {environment} from '../../../environments/environment';
import {HttpStatusCode} from '../enums/http-status-code';
import {HttpException} from '../classes/http-exception.class';

@Injectable()
export class HttpService {
  /**
   * 获取json对象
   * @param res
   * @returns {{}}
   */
  static extractData(res: Response): any {
    let body;
    try {
      body = res.json();
    } catch (error) {
      return {};
    }
    return ('undefined' === typeof body || null === body) ? {} : body;
  }

  /**
   * 得到接口的绝对地址
   * @param apiMethod
   * @returns {string}
   */
  static getAbsoluteRequestUrl(apiMethod: string): string {
    return environment.api_host + apiMethod;
  }

  /**
   *more处理异常
   * @param error
   * @returns {any}
   */
  static handleError(error: Response | any): Observable<HttpException> {
    // In a real world app, you might use a remote logging infrastructure
    const exception = new HttpException(HttpStatusCode.OtherError);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      exception.statusCode = error.status;
      exception.errorMessage = err;
    } else {
      errMsg = error.message ? error.message : error.toString();
      exception.errorMessage = errMsg;
    }
    console.error(errMsg);
    return Observable.throw(exception);
  }


  constructor(private http: InterceptorService) {
  }


  /**
   * 将json对象转成url 参数
   * @param url
   * @param obj
   * @returns {string}
   */
  private objectToUrl(url: string, obj: any): string {
    let paramStr = '';
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return url + '/' + obj;
    }

    paramStr = this.objectToQueryParams(obj);

    if (paramStr.length == 0) {
      return url;
    }

    return url + '?' + paramStr.substr(1);
  }

  /**
   * 将json对象转换为QueryParams
   * @param obj
   * @param key
   */
  private objectToQueryParams(obj: any, key?: string): string {
    if (obj == null) {
      return '';
    }

    let queryParams = '';
    const t = typeof (obj);
    if (t === 'string' || t === 'number' || t === 'boolean') {
      queryParams += '&' + key + '=' + encodeURIComponent(obj);
    } else {
      for (let i in obj) {
        let k = key == null ? i : key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
        queryParams += this.objectToQueryParams(obj[i], k);
      }
    }
    return queryParams;
  }

  /**
   * post 请求api
   * @param url
   * @param data
   * @returns Observable<Response>
   */
  public post<T>(url: string, data: any): Observable<T> {
    return this.http
      .post(HttpService.getAbsoluteRequestUrl(url), data)
      .map(HttpService.extractData)
      .catch(HttpService.handleError);
  }

  /**
   * get 请求api
   * @param url
   * @param data
   * @returns Observable<Response>
   */
  public get<T>(url: string, data?: any): Observable<T> {
    return this.http
      .get(this.objectToUrl(HttpService.getAbsoluteRequestUrl(url), data))
      .map(HttpService.extractData)
      .catch(HttpService.handleError);
  }
}
