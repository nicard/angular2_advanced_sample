import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PhotoService} from '../photo/photo.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  addForm: FormGroup;
  file: File;
  preview: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
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
      .subscribe(() => {
        this.router.navigate(['']);
      });
  }

  handleFile(file: File) {
    this.file = file;
    const reader = new FileReader();
    reader.onload = (event: any) => this.preview = event.target.result;
    reader.readAsDataURL(file);
  }

}
