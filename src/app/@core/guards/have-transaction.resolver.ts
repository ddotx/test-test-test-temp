import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  Router,
} from '@angular/router';
import { merge, Observable, of } from 'rxjs';
import { filter, map, pluck, shareReplay, tap } from 'rxjs/operators';
import { RedeemTransactionService } from '../services/redeem-transaction.service';

@Injectable()
export class HaveTransactionResolver implements Resolve<any> {
  constructor(
    private _router: Router,
    private _redeemTransaction: RedeemTransactionService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const transactionId = route.queryParamMap.get('transaction');
    if (!transactionId) {
      alert('Please send parameter url transaction');
      return of(false);
    }
    const redeemInfo$ = this._redeemTransaction
      .getApi(transactionId)
      .pipe(shareReplay(1));

    const success$ = redeemInfo$.pipe(
      filter(({ ok }) => !!ok),
      tap((res) => this._redeemTransaction.storeResponseStatus(res)),
      pluck('data'),
      map((res) => res[0]),
      tap(({ redeem }) => {
        console.warn('---end of campaign---')
        // redeem && this._router.navigate(['status'])
        this._router.navigate(['end'])
      })
    );
    const fail$ = redeemInfo$.pipe(
      filter(({ ok }) => !ok),
      tap((_) => this._router.navigate(['status', 'fail']))
    );
    return merge(success$, fail$);
  }
}
