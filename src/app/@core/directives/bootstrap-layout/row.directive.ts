import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[gnextRow]',
})
export class RowDirective implements OnInit {
  @Input('gnextRow') jc!: string;

  constructor(private renderer2: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    this.addRow();
    this.addJustifyContent(this.jc);
  }

  private addRow(): void {
    /* example "row" */
    this.renderer2.addClass(this.element.nativeElement, 'row');
  }

  private addJustifyContent(input: string): void {
    /* example "start", "center", "end", "around", "between" */
    const content = ['start', 'center', 'end', 'around', 'between'];
    if (input)
      content
        .filter((res) => res === input)
        .map((res, index) => {
          this.renderer2.addClass(
            this.element.nativeElement,
            'justify-content-'.concat(res)
          );
        });
  }
}
