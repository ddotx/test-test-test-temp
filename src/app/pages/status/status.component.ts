import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';


@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class StatusComponent {
  isWeb$ = this._breakpoint.isWeb$;
  constructor(private _breakpoint: BreakpointService) {}
}
