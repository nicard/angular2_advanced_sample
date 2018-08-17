import {ErrorHandler, Injectable, Injector} from '@angular/core';
import * as StackTrace from 'stacktrace-js';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';

import {UserService} from '../../core/user/user.service';
import {ServerLoggerService} from './server-logger.service';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const logService = this.injector.get(ServerLoggerService);
    const router = this.injector.get(Router);
    const url = location instanceof PathLocationStrategy
    ? location.path() : '';

    console.log('Passei pelo error handler');
    const message = error.message ? error.message : error.toString();

    router.navigate(['/error']);
    StackTrace
      .fromError(error)
      .then((stackFrames) => {
        const stackAsString = stackFrames
          .map(sf => sf.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString );
        logService
          .log({message, url, userName: userService.getUserName(), stack: stackAsString})
          .subscribe( () => {
            console.log('Error logged on server');
          }, (err) => {
            console.log('Fail to send error log to server');
          });
      });
  }
}
