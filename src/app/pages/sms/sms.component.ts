import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, of, Subject, timer } from 'rxjs';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SmsComponent implements OnInit, OnDestroy {
  isWeb$ = this._breakpoint.isWeb$;
  promoCode$ = new BehaviorSubject<boolean>(false);
  private _redeemInfo$ = new BehaviorSubject<any>(null);
  redeemInfo$ = this._redeemInfo$.asObservable();
  private _onDestroy = new Subject<void>();
  timeStampBS = new BehaviorSubject<Date>(new Date());

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _redeemTransaction: RedeemTransactionService,
    private _breakpoint: BreakpointService
  ) {}

  ngOnInit(): void {
    const transactionInfo = this._route.snapshot.data['transactionInfo'];
    this.getDataFromApi(transactionInfo);
  }

  getDataFromApi(transactionInfo:string) {
    if (!transactionInfo) return;
    this._redeemInfo$.next(transactionInfo);
  }

  onRedeem() {
    const { id } = this._redeemInfo$.getValue();
    const redeemFlow$ = this._redeemTransaction.postApi(id).pipe(
      take(1),
      tap((res) => {
        console.error(res)
        this.timeStampBS.next(new Date())
        console.error(this.timeStampBS.getValue())
      }),

      tap(
        (res) =>
          !res.ok && !res.error && this._router.navigate(['status', 'fail'])
      ),
      filter(({ ok }) => !!ok),
      switchMap((_) => {
        this.promoCode$.next(true);
        return timer(1800000).pipe( // ? 30min
          tap((_) => {
            this.promoCode$.next(false);
            this._router.navigate(['status']);
          }),
          takeUntil(this._onDestroy)
        );
      })
    );
    redeemFlow$.pipe(
      tap((res) => console.log('---start redeemFlow---'))
      ).subscribe()
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.promoCode$.complete();
  }
}
