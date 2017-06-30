/**
 * Created by KingKong on 2017/6/8.
 */
import {Input, Component, OnInit, forwardRef, Output, EventEmitter} from '@angular/core';


@Component({
  selector: 'app-center-header',
  templateUrl: './center-header.component.html',
  styleUrls: ['./center-header.component.css']
})
export class CenterHeaderComponent implements OnInit {
  @Input()
  moduleName: string;
  @Input()
  controlList: string[];
  @Input()
  placeholder: string;

  searchKey: string;

  @Output()
  onSearch = new EventEmitter<string>();

  constructor() {
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.onSearch.emit(this.searchKey);
    }
  }

  onSearchClick(event: MouseEvent) {
    this.onSearch.emit(this.searchKey);
  }

  ngOnInit(): void {
  }

  onControlClick(index) {
  }
}

export declare interface ICenterHeaderComponent {
  moduleName: string;
  controlList: string[];
  placeholder: string;

  onSearch(val: string): void
}
