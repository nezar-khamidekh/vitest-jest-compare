import { Directive, TemplateRef, ViewContainerRef, Input, inject } from '@angular/core';

@Directive({
  selector: '*[appCustomNgIf]',
})
export class CustomNgIfDirective {
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  @Input() set appCustomNgIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
