import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'c-text-header',
  templateUrl: './c-text-header.component.html',
  styleUrls: ['./c-text-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CTextHeaderComponent implements OnInit {
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() textAlign: String = 'center';
  @Input() color: String = 'black';
  @Input() fontSize: String = '2vw';
  @Input() fontWeight: String = '500';
  @Input() webkitLineClamp: String = 'unset';
  @Input() ngStyles = {};
  @Input() text: String = 'xxxxxx';
  @Input() width!: String;

  skeleton: Boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.onSkeleton();
  }

  onSkeleton(): void {
    if (this.text !== 'xxxxxx') this.skeleton = true;
  }
}
