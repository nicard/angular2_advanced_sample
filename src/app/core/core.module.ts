import {NgModule} from '@angular/core';
import {HeaderComponent} from './header/header.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {RequestInterceptor} from './auth/request.interceptor';
import {FooterComponent} from './footer/footer.component';
import {AlertModule} from '../shared/components/alert/alert.module';
import {LoadingModule} from '../shared/loading/loading.module';
import {MenuModule} from '../shared/components/menu/menu.module';
import {ShowIfLoggedModule} from '../shared/directives/show-if-logged/show-if-logged.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    AlertModule,
    LoadingModule,
    MenuModule,
    ShowIfLoggedModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class CoreModule {

}
