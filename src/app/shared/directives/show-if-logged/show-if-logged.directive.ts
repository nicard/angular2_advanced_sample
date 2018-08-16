import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {UserService} from '../../../core/user/user.service';

@Directive({
  selector: '[appShowIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {
  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private service: UserService
  ) { }

  ngOnInit(): void {
    console.log("ShowIfLoggedDirective loadrd");
    if (!this.service.isLogged()) {
      this.renderer.setStyle(this.element.nativeElement, 'display','none');
    }
  }
}
