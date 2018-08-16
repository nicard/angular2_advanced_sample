import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {Photo} from '../../photo/photo';
import {UserService} from '../../../core/user/user.service';

@Directive({
  selector: '[appPhotoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
  @Input() ownedPhoto: Photo;
  constructor(
    private element: ElementRef<any>,
    private renderer: Renderer2,
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.service
      .getUser()
      .subscribe(user => {
        if (!user || user.id !== this.ownedPhoto.userId) {
          this.renderer.setStyle(this.element.nativeElement, 'display', 'none');
        }
      });
  }
}
