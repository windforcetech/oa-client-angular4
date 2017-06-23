/**
 * Created by KingKong on 2017/5/27.
 */
import {ModelVO} from '../component/customize-form/customize-form.component';

export class AddPatientVO implements ModelVO {
  public PatientName: string = null;
  public PatientCode: string = null;
  public Sex: number = null;
  public Age: number = null;
  public BirthDate: Date = null;
  public Tel: string = null;
}
