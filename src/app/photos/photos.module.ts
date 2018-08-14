import { NgModule } from '@angular/core';

import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    PhotosModule
  ],
  exports: [
    PhotoComponent
  ]
})
export class PhotosModule { }
