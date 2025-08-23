import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective {
  private el = inject(ElementRef);

  @HostListener('mouseenter')
  showTooltip() {
    this.el.nativeElement.title = 'This is a tooltip';
  }

  @HostListener('mouseleave')
  hideTooltip() {
    this.el.nativeElement.title = '';
  }
}
