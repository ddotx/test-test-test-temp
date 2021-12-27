import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[libOnlyCharacter]',
})
export class OnlyCharacterDirective {
  regexStr = '^[\u0E00-\u0E7Fa-zA-Z_ ]*$';
  @Input('libOnlyCharacter') on = false;
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
      this.el.nativeElement.value = this.el.nativeElement.value
        .replace(/[^\u0E00-\u0E7Fa-zA-Z_ ]/g, '')
        .replace(/\s/g, ' ');
      event.preventDefault();
    }, 100);
  }
}
