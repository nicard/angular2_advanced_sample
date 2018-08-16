import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PhotoListComponent} from './photo-list.component';
import {LoadButtonComponent} from './load-button/load-button.component';
import {PhotosComponent} from './photos/photos.component';
import {FilterByDescriptionPipe} from './filter-by-description.pipe';
import {CommonModule} from '@angular/common';
import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/components/card/card.module';
import {SearchComponent} from './search/search.component';
import {DarkOnHoverModule} from '../../shared/directives/darken-on-hover/dark-on-hover.module';

@NgModule({
  declarations: [
    PhotoListComponent,
    LoadButtonComponent,
    PhotosComponent,
    FilterByDescriptionPipe,
    SearchComponent
  ],
  imports: [
    CommonModule,
    PhotoModule,
    CardModule,
    DarkOnHoverModule,
    RouterModule
  ]
})
export class PhotoListModule {

}
