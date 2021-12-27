import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libOnlyCharacterNumber]',
})
export class OnlyCharacterNumberDirective {
  regexStr = '^[\u0E00-\u0E7F0-9\u0E00-\u0E7Fa-zA-Z]*$';
  @Input('libOnlyCharacterNumber') on = false;
  @Input() isAlphaNumeric!: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event:any) {
    if (!this.on) return event.key;
    return new RegExp(this.regexStr).test(event.key);
  }

  @HostListener('paste', ['$event']) blockPaste(event: KeyboardEvent) {
    if (!this.on) return;
    this.validateFields(event);
  }

  validateFields(event:any) {
    setTimeout(() => {
      this.el.nativeElement.value = this.el.nativeElement.value.replace(
        /[^[0-9\. ]/g,
        ''
      );
      event.preventDefault();
    }, 100);
  }
}
