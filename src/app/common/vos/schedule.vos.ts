/**
 * Created by KingKong on 2017/6/5.
 */
export class RegisterVO {
  constructor(public UserName: string = '',
              public UserPassword: string = '',
              public UserPassword1: number = null,
              public Age: number = null,
              public BirthDate: Date = null,
              public Tel: string = null,
              public AreaCode: string = null,
              public Phone: string = null,
              public Address: string = null,
              public Image: string = null,
              public FirstDoctor: string = null,
              public FirstDate: Date = null,
              public IntentionDoctorCode: string = null,
              public RelationCode: string = null,
              public PatientsWith: number = null,
              public Note: string = null,
              public Province: string = null,
              public City: string = null,
              public Area: string = null) {
  }
}
