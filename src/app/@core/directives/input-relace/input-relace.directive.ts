import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[gnextInputRelace]',
})
export class InputRelaceDirective {
  @Input('gnextInputRelace') replace: any;

  constructor(private element: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    // /[^0-9]*/g
    // /[^a-zA-Zก-ฮ]*/g
    if (this.replace) {
      const initalValue = this.element.nativeElement.value;
      this.element.nativeElement.value = initalValue.replace(this.replace, '');
      if (initalValue !== this.element.nativeElement.value)
        event.stopPropagation();
    }
  }
}
