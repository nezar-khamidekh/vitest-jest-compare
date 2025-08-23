import { Directive, ElementRef, inject, Input } from '@angular/core';

@Directive({
  selector: '[appDisabled]',
})
export class DisabledDirective {
  private el = inject(ElementRef);

  @Input() set appDisabled(condition: boolean) {
    if (condition) {
      this.el.nativeElement.disabled = true;
    } else {
      this.el.nativeElement.disabled = false;
    }
  }
}
