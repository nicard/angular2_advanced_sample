import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDarkOnHover]'
})
export class DarkenOnHoverDirective {
  @Input() brightness = '70%';
  constructor(private element: ElementRef, private render: Renderer2) { }

  @HostListener('mouseover')
  darkenOn() {
    this.render.setStyle(this.element.nativeElement, 'filter', `brightness(${this.brightness})`)
  }

  @HostListener('mouseleave')
  darkenOff() {
    this.render.setStyle(this.element.nativeElement, 'filter', 'brightness(100%)')
  }
}
