/**
 * Created by KingKong on 2017/7/8.
 */
import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Observer} from 'rxjs/Observer';

import {CookieService} from 'ngx-cookie';

@Injectable()
export class UploadService {
  constructor(private cookie: CookieService) {
  }

  uploadImages(files: FileList): Observable<any> {
    const self = this;
    return Observable.create((observer: Observer<any>) => {
      let requests: FormData[] = [];
      for (let i = 0; i < files.length; i++) {
        let formData = new FormData();
        formData.append('Attachment', files[i]);
       // formData.append('ServiceType', ServiceTypeEnum.QINIU);
        requests.push(formData)
      }

      let xhr2;

      function createHttp() {
        xhr2 = new XMLHttpRequest();
        xhr2.upload.onprogress = uploadProgress;
        xhr2.onload = uploadComplete;
        xhr2.onerror = uploadFailed;
        xhr2.onabort = uploadCanceled;
      }

      function clearHttp() {
        xhr2.upload.onprogress = null;
        xhr2.onload = null;
        xhr2.onerror = null;
        xhr2.onabort = null;
        xhr2 = null;
      }

      function uploadProgress(evt: ProgressEvent) {
        if (evt.lengthComputable) {
          console.log(Math.round(evt.loaded * 100 / evt.total) + '%');
        }
      }

      function uploadComplete(evt: Event) {
        clearHttp();
        uploadNext();
      }

      function uploadFailed(evt: Event) {
        console.log('error');
      }

      function uploadCanceled(evt: Event) {
        console.log('cancel');
      }

      function uploadNext() {
        const request = requests.shift();
        if (request) {
          createHttp();
          xhr2.open('POST', '');

          xhr2.setRequestHeader('Authorization', self.cookie.get('globals_user'));
          xhr2.setRequestHeader('Worker', self.cookie.get('globals'));

          xhr2.send(request);
        } else {
          uploadAllComplete();
        }
      }

      function uploadAllComplete() {
        requests.length = 0;
        requests = null;
      }

      uploadNext();
    });
  }
}
