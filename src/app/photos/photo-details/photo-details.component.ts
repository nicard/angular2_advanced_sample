import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PhotoService} from '../photo/photo.service';
import {Photo} from '../photo/photo';
import {Observable} from 'rxjs';
import {AlertService} from '../../shared/components/alert/alert.service';
import {UserService} from '../../core/user/user.service';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  private photoId: number;

  constructor(
    private route: ActivatedRoute,
    private service: PhotoService,
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.photoId = this.route.snapshot.params.photoId;
    this.photo$ = this.service.findById(this.photoId);
    this.photo$.subscribe(() => {}, error => {
      this.router.navigate(['not-found']);
    });
  }

  remove() {
    this.service
      .removePhoto(this.photoId)
      .subscribe(() => {
        this.router.navigate(['user', this.userService.getUserName()], {replaceUrl: true});
        this.alertService.success('Photo removed', true);
      }, error => {
        console.log(error);
        this.alertService.warning('Could not delete the photo!');
      });
  }

  like(photo: Photo) {
    this.service
      .like(photo.id)
      .subscribe(liked => {
        if (liked) {
          this.photo$ = this.service.findById(photo.id);
        }
      });
  }
}
