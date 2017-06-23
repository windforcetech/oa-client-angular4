/**
 * Created by KingKong on 2017/6/5.
 */
import {ModelVO} from '../component/customize-form/customize-form.component';
export class LoginVO implements ModelVO {
  constructor(public UserName: string = '',
              public Password: string = '') {
  }
}
