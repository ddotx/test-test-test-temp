import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PositionService {
  private onPosition = new BehaviorSubject<boolean>(false);
  onPosition$ = this.onPosition.asObservable();

  private lat = new BehaviorSubject<number>(0);
  lat$ = this.lat.asObservable();
  private lng = new BehaviorSubject<number>(0);
  lng$ = this.lng.asObservable();
  positions$ = combineLatest([this.lat$, this.lng$]).pipe(
    map(([lat, lng]) => ({ lat, lng }))
  );

  position$ = combineLatest([this.onPosition$, this.positions$]).pipe(
    map(([onPosition, positions]) => ({
      onPosition,
      positions,
    }))
  );

  getPosition(callBack: any): void {
    this.getCustomerPosition((res: any) => {
      callBack(res);
    });
  }

  sendOnPosition(position: boolean): void {
    this.onPosition.next(position);
  }

  error(error:any): void {
    if (error.code === error.PERMISSION_DENIED)
      alert(
        `Error : code : ${error.code} Geolocation is not supported by this browser.`
      );
  }

  getCustomerPosition(callBack: any): void {
    navigator.geolocation.getCurrentPosition((positions) => {
      const coords = positions.coords;
      callBack(coords);
    }, this.error);
  }
}
