import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NewUser} from './new-user';
import {environment} from '../../../environments/environment';

const API_URL = environment.ApiUrl;
@Injectable()
export class SignupService {
  constructor(private http: HttpClient) { }

  checkUserNameTake(userName: string) {
    return this.http.get(API_URL + '/user/exists/' + userName);
  }

  signup(user: NewUser) {
    return this.http.post(API_URL + '/user/signup', user);
  }
}
