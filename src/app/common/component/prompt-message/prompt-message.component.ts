import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-prompt-message',
  templateUrl: './prompt-message.component.html',
  styleUrls: ['./prompt-message.component.scss']
})
export class PromptMessageComponent implements OnInit {
  @Input()
  message: string;

  // @HostBinding('attr.status')
  // hostStatus: string;

  constructor() {
  }

  ngOnInit() {
  }

  setMessage(val: string) {
    this.message = val;
  }

  show(delay: number) {
    // this.hostStatus = 'show';

    setTimeout(() => {
      this.hide();
    }, delay)
  }

  hide() {
    // this.hostStatus = 'hide';
  }
}
