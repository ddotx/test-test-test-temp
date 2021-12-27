import { Directive, Input, OnInit, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[gnextColumn]',
})
export class ColumnDirective implements OnInit {
  @Input('gnextColumn') col = '';
  @Input() mr = '';
  @Input() ml = '';

  constructor(private renderer2: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    this.addColumn(this.col);
    this.addColumnMarginR(this.mr);
    this.addColumnMarginL(this.ml);
  }

  private addColumn(input_col: string): void {
    /* example "col-", "col-sm-", "col-md-", "col-lg-", "col-xl-" */
    const cols = ['col-', 'col-sm-', 'col-md-', 'col-lg-', 'col-xl-'];
    input_col
      .split(',')
      .filter((res, index) => index < cols.length)
      .map((res, index) =>
        this.renderer2.addClass(
          this.element.nativeElement,
          cols[index].concat(res)
        )
      );
  }

  private addColumnMarginR(input_col: string): void {
    /* example "mr-", "mr-sm-", "mr-md-", "mr-lg-", "mr-xl-" */
    const cols = ['mr-', 'mr-sm-', 'mr-md-', 'mr-lg-', 'mr-xl-'];
    if (input_col !== '')
      input_col
        .split(',')
        .filter((res, index) => index < cols.length)
        .map((res, index) =>
          this.renderer2.addClass(
            this.element.nativeElement,
            cols[index].concat(res)
          )
        );
  }

  private addColumnMarginL(input_col: string): void {
    /* example "ml-", "ml-sm-", "ml-md-", "ml-lg-", "ml-xl-" */
    const cols = ['ml-', 'ml-sm-', 'ml-md-', 'ml-lg-', 'ml-xl-'];
    if (input_col !== '')
      input_col
        .split(',')
        .filter((res, index) => index < cols.length)
        .map((res, index) =>
          this.renderer2.addClass(
            this.element.nativeElement,
            cols[index].concat(res)
          )
        );
  }
}
