import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {lowerCaseValidator} from '../../shared/validators/lowercase.validator';
import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {NewUser} from './new-user';
import {SignupService} from './signup.service';
import {Router} from '@angular/router';
import {PlatformDetectorService} from '../../core/platform/platform.detector.service';
import {AlertService} from '../../shared/components/alert/alert.service';
import {usernamePasswordValidator} from './username-password.validator';

@Component({
  templateUrl: './signup.component.html',
  providers: [ UserNotTakenValidatorService ]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('email') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidorService: UserNotTakenValidatorService,
    private router: Router,
    private alertService: AlertService,
    private signupService: SignupService,
    private platformDetectionService: PlatformDetectorService
  ) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
      fullName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      userName: ['',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(20)
        ],
        this.userNotTakenValidorService.checkUserNameTaken()
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14)
        ]
      ]
    }, {
      validator: usernamePasswordValidator
    });

    this.setFocus();
  }

  signup() {
    if (!this.signupForm.invalid  && !this.signupForm.pending) {
      const newUser = this.signupForm.getRawValue() as NewUser;
      this.signupService
        .signup(newUser)
        .subscribe(() => {
          this.alertService.success('New user register', true);
          this.router.navigate(['']);
        }, err => {
          this.alertService.danger('Could not possible to register user', true);
          console.log(err);
        });
    }
  }

  private setFocus() {
    if (this.platformDetectionService.isPlatformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }
}
