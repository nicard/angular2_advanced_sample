import {NgModule} from '@angular/core';
import {PhotoFormComponent} from './photo-form.component';
import {CommonModule} from '@angular/common';
import {VmessageModule} from '../../shared/components/vmessage/vmessage.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PhotoModule} from '../photo/photo.module';
import {ImmediateClickModule} from '../../shared/directives/immediate-click/immediate-click.module';

@NgModule({
  declarations: [
    PhotoFormComponent
  ],
  imports: [
    CommonModule,
    VmessageModule,
    ReactiveFormsModule,
    PhotoModule,
    ImmediateClickModule,
    RouterModule
  ]
})
export class PhotoFormModule {

}
