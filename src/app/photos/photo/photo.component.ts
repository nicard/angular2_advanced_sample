import {Component, Input} from '@angular/core';

const cloud = 'http://localhost:3000/imgs/';
@Component({
  selector: 'app-photo',
  templateUrl: 'photo.component.html',
  styleUrls: ['photo.component.css']
})
export class PhotoComponent {
  @Input() description;
  private _src: string;
  @Input() set src(src: string) {
    if (src && src.startsWith('data')) {
      this._src = src;
    } else {
      this._src = cloud + src;
    }
  }

  get src() {
    return this._src;
  }
}
