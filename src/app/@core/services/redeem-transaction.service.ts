import { Injectable } from '@angular/core';
import { ApiCockpitService } from './api-cockpit.service';
import {
  filter,
  map,
  pluck,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

export enum ResStatus {
  Success = 'success',
  Fail = 'fail',
  Full = 'full',
  FullMobile = 'full mobile',
  FullLicence = 'full licence',
  Required = 'required',
}

@Injectable({ providedIn: 'root' })
export class RedeemTransactionService {
  private _resStatus$ = new BehaviorSubject<string>(ResStatus.Fail);
  resStatus$ = this._resStatus$.asObservable();

  private _transactionId$ = new BehaviorSubject<string>('');
  transactionId$ = this._transactionId$.asObservable();

  public BackendCampaign = new BehaviorSubject<any>('');
  BackendCampaignOb$ = this.BackendCampaign.asObservable();

  set transactionId(transactionId: string) {
    this._transactionId$.next(transactionId);
  }

  constructor(
    private _router: Router,
    private _apiCockpit: ApiCockpitService
  ) {}

  getBackendCampaign() {
    return this._apiCockpit.mergeUrl({ path: `api/backend-campaign/8` }).pipe(
      filter(({ ok }) => !!ok),
      pluck('data')
    );
  }

  getApi(transactionId: string) {
    return this._apiCockpit.mergeUrl({ path: `api/campaign/${transactionId}` });
  }

  postApi(transactionId: string) {
    return this._apiCockpit.mergeUrl({
      method: 'post',
      path: `api/campaign/${transactionId}`,
      data: {},
    });
  }

  getTransaction() {
    return this.transactionId$.pipe(
      switchMap((transactionId) =>
        this._apiCockpit
          .mergeUrl({ path: `api/campaign/${transactionId}` })
          .pipe(
            filter(({ ok }) => !!ok),
            pluck('data'),
            map((data) => data[0])
          )
      )
    );
  }

  postRedeem() {
    return this.transactionId$.pipe(
      switchMap((transactionId) =>
        this._apiCockpit.mergeUrl({
          method: 'post',
          path: `api/campaign/${transactionId}`,
          data: {},
        })
      )
    );
  }

  postSumitCampaign(data: {
    firstname: string;
    lastname: string;
    mobile: string;
    license_number: string;
    license_province: string;
    car_brand: string;
    car_model: string;
    car_sub_model: string;
    car_year: string;
    tire_brand: string;
    tire_front: string;
    tire_rear: string;
    branch_id: number;
  }) {
    return this._apiCockpit.mergeUrl({
      method: 'post',
      path: 'api/campaign/submit',
      data,
    });
  }

  checkQuota$: Observable<boolean> = this._apiCockpit
    .mergeUrl({ path: 'api/campaign/quota' })
    .pipe(
      tap(console.warn),
      map(({ ok, msg, ...res }) => {
        // ok = 0 // ! Force Error
        if (ok) return !!ok;
        // this.storeResponseStatus({ ok, msg, error: 1,...res }); // ! Force Error
        this.storeResponseStatus({ ok, msg, ...res });
        this._router.navigate(['complete']);
        return !ok;
      })
    );

  storeResponseStatus(res: {
    ok: number;
    msg: string;
    error?: number;
    data?: boolean;
  }) {
    const { ok, error = null } = res;

    if (ok) {
      this._resStatus$.next(ResStatus.Success);
      return ResStatus.Success;
    }

    if (typeof error !== 'number') {
      this._resStatus$.next(ResStatus.Fail);
      return ResStatus.Fail;
    }

    const funcCase: any = {
      0: () => ResStatus.Required,
      1: () => ResStatus.Full,
      2: () => ResStatus.FullMobile,
      3: () => ResStatus.FullLicence,
    };

    const result: string =
      typeof funcCase[error] !== 'function'
        ? ResStatus.Fail
        : funcCase[error]();
    this._resStatus$.next(result);
    return result;
  }
}
