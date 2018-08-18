import {Injectable} from '@angular/core';
import {PlatformDetectorService} from '../platform/platform.detector.service';
const KEY = 'authToken';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private platformDetectorService: PlatformDetectorService) { }

  hasToken() {
    return !!this.getToken();
  }

  setToken(token: string) {
    if (this.platformDetectorService.isPlatformBrowser()){
        window.localStorage.setItem(KEY, token);
    }
  }

  getToken() {
    if (this.platformDetectorService.isPlatformBrowser()) {
      return window.localStorage.getItem(KEY);
    }
    return null;
  }

  removeToken() {
    if (this.platformDetectorService.isPlatformBrowser()) {
      window.localStorage.removeItem(KEY);
    }
  }
}
