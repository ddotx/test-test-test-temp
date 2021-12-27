import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'c-text',
  templateUrl: './c-text.component.html',
  styleUrls: ['./c-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CTextComponent implements OnInit {
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() border!: String;
  @Input() borderRadius!: String;
  @Input() textAlign: String = 'center';
  @Input() color: String = 'black';
  @Input() fontSize: String = '1vw';
  @Input() lineHeight: String = '1.5';
  @Input() fontWeight: String = '300';
  @Input() webkitLineClamp: String = 'unset';
  @Input() ngStyles = {};
  @Input() text: String = 'xxxxxx';

  skeleton: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.onSkeleton();
  }

  onSkeleton(): void {
    if (this.text !== 'xxxxxx') this.skeleton = true;
  }
}
