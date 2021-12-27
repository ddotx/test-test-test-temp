import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { takeUntil, tap } from 'rxjs/operators';
import { BreakpointService } from './@core/services/breakpoint.service';
import { RedeemTransactionService } from './@core/services/redeem-transaction.service';


@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {
  title = 'cockpit-web-campaign-v2';
  isWeb$ = this._breakpoint.isWeb$;
  private _onDestroy = new Subject<void>();

  constructor(
    private _breakpoint: BreakpointService,
    private _backend: RedeemTransactionService
  ) {
    this._breakpoint.init().pipe(takeUntil(this._onDestroy)).subscribe();
  }

  ngOnInit(): void {
    this._backend.getBackendCampaign().pipe(
      tap((res) => this._backend.BackendCampaign.next(res)),
    ).subscribe();    
  }

  ngOnDestroy(): void {
  
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
