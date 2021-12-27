import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'c-button',
  templateUrl: './c-button.component.html',
  styleUrls: ['./c-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CButtonComponent {
  @Input() borderWidth: String = '2px';
  @Input() borderStyle: String = 'solid';
  @Input() borderColor: String = 'black';
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() width: String = 'auto';
  @Input() height: String = 'auto';
  @Input() textAlign: String = 'center';
  @Input() color: String = 'black';
  @Input() background: String = 'white';
  @Input() fontSize: String = '1vw';
  @Input() fontWeight: String = '300';
  @Input() ngStyles = {};
  @Input() icon!: String;
  @Input() text: String = 'xxxxxx';
  @Output() onclick = new EventEmitter<Boolean>();

  constructor() {}

  onClick(): void {
    this.onclick.emit(true);
  }
}
