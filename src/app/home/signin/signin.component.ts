import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {PlatformDetectorService} from '../../core/platform/platform.detector.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;

  constructor(
    private fromBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private platformDetectionService: PlatformDetectorService
  ) { }

  ngOnInit() {
    this.loginForm = this.fromBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.setFocus();
  }

  login() {
    const userName = this.loginForm.get('userName').value;
    const password =  this.loginForm.get('password').value;
    this.service
      .authenticate(userName, password)
      .subscribe(() => {
        this.router.navigate(['user', userName]);
      }, () => {
        alert('Invalid user name or password');
        this.loginForm.reset();
        this.setFocus();
      });
  }

  private setFocus() {
    if (this.platformDetectionService.isPlatformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }

}
