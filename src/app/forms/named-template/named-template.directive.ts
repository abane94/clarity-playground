import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appNamedTemplate], [named-template]'
})
export class NamedTemplateDirective {

  constructor(public readonly template: TemplateRef<any>) { }

  @Input('named-template') templateName: string = '';

}
