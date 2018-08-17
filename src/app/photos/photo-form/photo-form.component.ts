import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PhotoService} from '../photo/photo.service';
import {Router} from '@angular/router';
import {HttpEvent, HttpEventType, HttpResponse} from '@angular/common/http';
import {finalize} from 'rxjs/operators';

import {AlertService} from '../../shared/components/alert/alert.service';
import {UserService} from '../../core/user/user.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  addForm: FormGroup;
  file: File;
  preview: string;
  percenteDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private userService: UserService,
    private service: PhotoService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      file: ['', Validators.required ],
      description: ['', Validators.maxLength(300) ],
      allowComments: [true]
    });
  }

  upload() {
    const description = this.addForm.get('description').value;
    const allowComments = this.addForm.get('allowComments').value;
    this.service
      .upload(description, allowComments, this.file)
      .pipe(finalize(() => this.router.navigate(['user', this.userService.getUserName()])))
      .subscribe((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percenteDone = Math.round( 100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.alertService.success('Upload complete', true);
        }
      }, (error) => {
        console.log(error);
        this.alertService.danger('Upload error', true);
      });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
