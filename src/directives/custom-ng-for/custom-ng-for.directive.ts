import { Directive, TemplateRef, ViewContainerRef, Input, inject } from '@angular/core';

@Directive({
  selector: '*[appCustomNgFor]',
})
export class CustomNgForDirective {
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);

  @Input() set appCustomNgFor(items: any[]) {
    this.viewContainer.clear();
    if (items) {
      items.forEach((item) => {
        this.viewContainer.createEmbeddedView(this.templateRef, { $implicit: item });
      });
    }
  }
}
