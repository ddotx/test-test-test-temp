import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';


@Component({
  selector: 'app-fail',
  templateUrl: './fail.component.html',
  styleUrls: ['./fail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FailComponent {
  isWeb$ = this._breakpoint.isWeb$;
  constructor(private _breakpoint: BreakpointService) {}
}
