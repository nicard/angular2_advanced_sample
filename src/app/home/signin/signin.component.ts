import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../core/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PlatformDetectorService} from '../../core/platform/platform.detector.service';
import {AlertService} from '../../shared/components/alert/alert.service';

@Component({
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  @ViewChild('userNameInput') userNameInput: ElementRef<HTMLInputElement>;
  private fromUrl: string;

  constructor(
    private fromBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
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
    if (!this.loginForm.invalid && !this.loginForm.pending){
      const userName = this.loginForm.get('userName').value;
      const password =  this.loginForm.get('password').value;
      this.service
        .authenticate(userName, password)
        .subscribe(() => {
          this.activatedRoute.queryParams
            .subscribe(params => this.fromUrl = params.fromUrl);
          if (this.fromUrl) {
            this.router.navigateByUrl(this.fromUrl);
          } else {
            this.router.navigate(['user', userName]);
          }
        }, () => {
          this.alertService.danger('Invalid user name or password');
          this.loginForm.reset();
          this.setFocus();
        });
    } else {
      this.alertService.danger('Please, type username and password');
    }
  }

  private setFocus() {
    if (this.platformDetectionService.isPlatformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }

}
