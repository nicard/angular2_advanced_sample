import {NgModule} from '@angular/core';
import {PhotoListComponent} from './photo-list.component';
import {LoadButtonComponent} from './load-button/load-button.component';
import {PhotosComponent} from './photos/photos.component';
import {FilterByDescriptionPipe} from './filter-by-description.pipe';
import {CommonModule} from '@angular/common';
import {PhotoModule} from '../photo/photo.module';
import {CardModule} from '../../shared/card/card.module';
import { SearchComponent } from './search/search.component';

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
    CardModule
  ]
})
export class PhotoListModule {

}
