/**
 * Created by KingKong on 2017/7/1.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class FormKeyDictionaryService {
  /****外加工相关表单****/
  readonly ProcessSent: string[] = ['CommonTime', 'ExpressCode', 'ContactID', 'DayNum'];
  readonly ProcessReworked: string[] = ['ReworkReason', 'CommonTime'];
  readonly ProcessReceived: string[] = ['CommonTime'];
  readonly ProcessContent: string[] = ['DictDetailName'];
  readonly ProcessColor: string[] = ['DictDetailName'];
  readonly ProcessCompleted: string[] = ['CommonTime'];
  readonly CreateProcess: string[] = ['PatientID', 'DoctorID', 'Price', 'ProcessNum', 'ProcessCompanyId', 'Node', 'VisitingTime'];

  getFormKeys(formName): string[] {
    return this.hasOwnProperty(formName) ? this[formName] : [];
  }
}
