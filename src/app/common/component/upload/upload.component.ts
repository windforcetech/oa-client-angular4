import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UploadService} from "../../service/upload.service";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: ElementRef;

  @ViewChild('fileDrag')
  fileDrag: ElementRef;

  @Input()
  multiple: string;


  constructor(private upload: UploadService) {
  }

  ngOnInit() {
    // 阻止document的与拖拽相关的事件默认处理方式
    document.ondragleave = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
    document.ondragenter = function (e) {
      e.preventDefault();
    };
    document.ondragover = function (e) {
      e.preventDefault();
    }
  }

  onImageDropIn(evt) {
    evt.preventDefault(); //取消浏览器默认拖拽处理
    let fileList = evt.dataTransfer.files; //获取文件对象

    console.log(fileList);
  }

  onClickPost() {
    this.upload.uploadImages((<HTMLInputElement>this.fileUpload.nativeElement).files).subscribe(t => {
      console.log(t);
    });
  }
}
