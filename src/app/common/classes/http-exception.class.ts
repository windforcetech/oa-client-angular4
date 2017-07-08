/**
 * Created by KingKong on 2017/7/5.
 */
import {HttpStatusCode} from '../enums/http-status-code';

export class HttpException {
  constructor(public statusCode?: HttpStatusCode, public errorMessage?: string) {
  }
}
