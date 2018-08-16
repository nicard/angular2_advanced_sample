import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';

import {PhotoModule} from './photo/photo.module';
import {PhotoListModule} from './photo-list/photo-list.module';
import {PhotoFormModule} from './photo-form/photo-form.module';
import {PhotoDetailsModule} from './photo-details/photo-details.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    PhotoModule,
    PhotoListModule,
    PhotoDetailsModule,
    PhotoFormModule
  ]
})
export class PhotosModule { }
