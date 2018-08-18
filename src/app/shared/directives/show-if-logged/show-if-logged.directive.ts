import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../../core/user/user.service';
import {PlatformDetectorService} from '../../../core/platform/platform.detector.service';

@Directive({
  selector: '[appShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {
  currentDisplay: string;
  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private platformDetectorService: PlatformDetectorService,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
    this.service.getUser().subscribe((user) => {
      if (this.platformDetectorService.isPlatformBrowser()) {
        if (user) {
          this.renderer.setStyle(this.element.nativeElement, 'display', this.currentDisplay);
        } else {
          this.currentDisplay = getComputedStyle(this.element.nativeElement).display;
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      }
    });
  }
}
