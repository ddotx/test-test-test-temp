import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

import { tap } from 'rxjs/operators';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CompleteComponent {
  status$ = this._redeemTransaction.resStatus$.pipe(
    tap(res => console.error('---res status(complete page)---', res))
  );
  isWeb$ = this._breakpoint.isWeb$;

  constructor(
    private _breakpoint: BreakpointService,
    private _redeemTransaction: RedeemTransactionService
  ) {}
}
