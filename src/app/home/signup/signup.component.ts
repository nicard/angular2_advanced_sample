import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {lowerCaseValidator} from '../../shared/validators/lowercase.validator';
import {UserNotTakenValidatorService} from './user-not-taken.validator.service';
import {NewUser} from './new-user';
import {SignupService} from './signup.service';
import {Router} from '@angular/router';
import {PlatformDetectorService} from '../../core/platform/platform.detector.service';

@Component({
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  @ViewChild('email') emailInput: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidorService: UserNotTakenValidatorService,
    private router: Router,
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
    });

    this.setFocus();
  }

  signup() {
    const newUser = this.signupForm.getRawValue() as NewUser;
    this.signupService
      .signup(newUser)
      .subscribe(() => {
        this.router.navigate(['']);
      }, err => console.log(err));
  }

  private setFocus() {
    if (this.platformDetectionService.isPlatformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }
}
