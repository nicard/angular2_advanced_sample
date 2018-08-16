import {Component, Input} from '@angular/core';
import {environment} from '../../../environments/environment';

const API_URL = environment.ApiUrl+'/imgs/';
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
      this._src = API_URL + src;
    }
  }

  get src() {
    return this._src;
  }
}
