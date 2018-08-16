import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';

import {PhotoComment} from '../../photo/photo-comment';
import {PhotoService} from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: [ './photo-comments.component.css' ]
})
export class PhotoCommentsComponent implements OnInit {

  commentForm: FormGroup;
  comments$: Observable<PhotoComment[]>;
  @Input() photoId: number;

  constructor(
    private service: PhotoService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(300)
      ])]
    });
    this.comments$ = this.service.getComments(this.photoId);
  }

  save() {
    const comments = this.commentForm.get('comment').value as string;
    this.comments$ = this.service
      .addComment(this.photoId, comments)
      .pipe(switchMap(() => this.service.getComments(this.photoId)))
      .pipe(tap( () => this.commentForm.reset()));
  }
}
