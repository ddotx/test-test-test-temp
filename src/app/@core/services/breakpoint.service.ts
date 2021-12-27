import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  private _isWeb$ = new BehaviorSubject<boolean>(false);
  isWeb$ = this._isWeb$.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {}

  init(): Observable<boolean> {
    return this.breakpointObserver
      .observe([Breakpoints.Tablet, Breakpoints.Web])
      .pipe(
        pluck('matches'),
        tap((isWeb) => console.log({ isWeb })),
        tap((isWeb) => this._isWeb$.next(isWeb))
      );
  }
}
