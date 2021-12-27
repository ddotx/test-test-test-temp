import { Directive, Input, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[gnextMargin]',
})
export class MarginDirective implements OnInit {
  @Input('gnextMargin') margin!: string;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.addPadding(this.margin);
  }

  private addPadding(input_margin: string): void {
    this.element.nativeElement.style.margin = input_margin;
  }
}
