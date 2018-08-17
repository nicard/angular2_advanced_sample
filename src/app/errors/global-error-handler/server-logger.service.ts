import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ServerLog} from './ServerLog';
import {environment} from '../../../environments/environment';

const API = environment.LogServerUrl;

@Injectable({providedIn: 'root'})
export class ServerLoggerService {
  constructor(private http: HttpClient) { }

  log(serverLog: ServerLog) {
    return this.http.post(API + '/infra/log', serverLog);
  }

}
