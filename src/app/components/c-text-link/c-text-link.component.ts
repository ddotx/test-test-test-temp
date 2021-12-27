import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'c-text-link',
  templateUrl: './c-text-link.component.html',
  styleUrls: ['./c-text-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CTextLinkComponent {
  @Input() borderWidth: String = '2px';
  @Input() borderStyle: String = 'solid';
  @Input() borderColor: String = 'black';
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() width: String = 'auto';
  @Input() height: String = 'auto';
  @Input() textAlign: String = 'center';
  @Input() color: String = 'black';
  @Input() background: String = '';
  @Input() fontSize: String = '1vw';
  @Input() fontWeight: String = '300';
  @Input() ngStyles = {};
  @Input() hrefType = ''; /* tel:+66 , mailto: */
  @Input() hrefLink = '';
  @Input() routerLinks: String | any;
  @Input() target = ''; /* _blank */
  @Input() text: String = 'xxxxxx';
  constructor() {}
}
