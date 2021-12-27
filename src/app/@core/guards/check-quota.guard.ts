import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { RedeemTransactionService } from '../services/redeem-transaction.service';

@Injectable()
export class CheckQuotaGuard implements CanActivate {
  constructor(private _redeemTransaction: RedeemTransactionService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._redeemTransaction.checkQuota$;
  }
}
