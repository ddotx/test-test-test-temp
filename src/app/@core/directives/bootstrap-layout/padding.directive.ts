import { Directive, Input, OnInit, ElementRef } from "@angular/core";

@Directive({
  selector: "[gnextPadding]",
})
export class PaddingDirective implements OnInit {
  @Input("gnextPadding") padding!: string;

  constructor(private element: ElementRef) {}

  ngOnInit(): void {
    this.addPadding(this.padding);
  }

  private addPadding(input_padding: string): void {
    this.element.nativeElement.style.padding = input_padding;
  }
}
