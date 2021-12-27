import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, pluck, shareReplay, switchMap, take, tap } from 'rxjs/operators';
import { DomeinApi, Datum } from '../models/branches.model';
import { DataSend } from '../models/data-send.model';
import { ApiCockpitService } from './api-cockpit.service';

@Injectable()
export class CockpitBranchesService {
  private page = new BehaviorSubject<DataSend>({
    params_title: 'page',
    params_data: '1',
  });
  page$ = this.page.asObservable();
  private perPage = new BehaviorSubject<DataSend>({
    params_title: 'per_page',
    params_data: '300',
  });
  perPage$ = this.perPage.asObservable();
  private isEnable = new BehaviorSubject<DataSend>({
    params_title: 'is_enable',
    params_data: '1',
  });
  isEnable$ = this.isEnable.asObservable();
  private lat = new BehaviorSubject<DataSend>({
    params_title: 'lat',
    params_data: '',
  });
  lat$ = this.lat.asObservable();
  private lng = new BehaviorSubject<DataSend>({
    params_title: 'lng',
    params_data: '',
  });
  lng$ = this.lng.asObservable();
  private search = new BehaviorSubject<DataSend>({
    params_title: 'search',
    params_data: '',
  });
  search$ = this.search.asObservable();

  dataSend$ = combineLatest([
    this.page$,
    this.perPage$,
    this.isEnable$,
    this.lat$,
    this.lng$,
    this.search$,
  ]).pipe(
    map(([page, perPage, isEnable, lat, lng, search]) => {
      return [page, perPage, isEnable, lat, lng, search] as DataSend[];
    })
  );

  private apiBranchs = {
    getApiBranchs$: combineLatest([this.dataSend$]).pipe(
      switchMap(([dataSend]) =>
        this._apiCockpit
          .mergeUrl({ path: 'api/branchs', params: dataSend })
          .pipe(map((res) => res as DomeinApi))
      ),
      shareReplay(1)
    ),
    dataSend: () => {
      const self = this;
      const function_data_send = {
        sendPage: function (page: string) {
          const self_ = this;
          const data_send = { params_title: 'page', params_data: page };
          self.page.next(data_send);
        },
        sendPerPage: function (per_page: string) {
          const self_ = this;
          const data_send = { params_title: 'per_page', params_data: per_page };
          self.perPage.next(data_send);
        },
        sendIsEnable: function (is_enable: string) {
          const self_ = this;
          const data_send = {
            params_title: 'is_enable',
            params_data: is_enable,
          };
          self.isEnable.next(data_send);
        },
        sendLat: function (lat: string) {
          const self_ = this;
          const data_send = { params_title: 'lat', params_data: lat };
          self.lat.next(data_send);
        },
        sendLng: function (lng: string) {
          const self_ = this;
          const data_send = { params_title: 'lng', params_data: lng };
          self.lng.next(data_send);
        },
        sendSearch: function (search: string) {
          const self_ = this;
          const data_send = { params_title: 'search', params_data: search };
          self.search.next(data_send);
        },
      };
      return function_data_send;
    },
  };
  /* api */
  getApiBranchs$ = this.apiBranchs.getApiBranchs$;
  /* api=>data */
  getApiBranchsData$ = this.getApiBranchs$.pipe(pluck('data', 'data'));
  /* api=>branchs */
  getBranchsData$ = this.getApiBranchsData$;
  // .pipe(
  //   map((res) =>
  //     res.map((data) => ({
  //       ...data,
  //       position: {
  //         lat: +data.location_latitude,
  //         lng: +data.location_longitude,
  //       },
  //     }))
  //   )
  // );
  /* api=>is_enable */
  getBranchsIsEnable$ = this.getBranchsData$.pipe(
    map((res) => res.filter((data) => !!data.is_enable))
  );
  /* api=>phone */
  getBranchsPhone$ = this.getBranchsIsEnable$.pipe(
    map((res) =>
      res.map((data) => ({
        ...data,
        phone: this.strReplace(data.phone, /\s/g, ''),
      }))
    )
  );
  /* api=>data_working_day_time_is_enable */
  getBranchsDataWorkingDayTimeIsEnable$ = this.getBranchsPhone$.pipe(
    map((res) =>
      res.map((data) => ({
        ...data,
        data_working_day_time_is_enable: data.data_working_day.reduce(
          (value, currentValue, currentIndex, arr) => {
            const index_day = this.getnNewDate().getDay();
            const name_day = this.getWorkingDay()[index_day];
            /* time => open */
            const open_time = currentValue.open_time.split(':');
            const open_time_number = this.getnNewDate().setHours(
              +open_time[0],
              +open_time[1],
              0
            );
            const is_open = new Date(open_time_number) <= this.getnNewDate();
            /* time => close */
            const close_time = currentValue.close_time.split(':');
            const close_time_number = this.getnNewDate().setHours(
              +close_time[0],
              +close_time[1],
              0
            );
            const is_close = this.getnNewDate() <= new Date(close_time_number);
            const is_enable = is_open && is_close && !!currentValue.enable;
            value =
              currentValue.day_name === name_day
                ? {
                    is_enable: is_enable,
                    color: is_enable ? 'green' : 'red',
                    is_name: `${is_enable ? 'เปิด' : 'ปิด'}ให้บริการ`,
                  }
                : value;
            return value;
          },
          { is_enable: false, color: '', is_name: '' }
        ),
      }))
    )
  );
  /* api=>data_working_day */
  getBranchsDataWorkingDay$ = this.getBranchsDataWorkingDayTimeIsEnable$.pipe(
    map((res) =>
      res.map((data) => ({
        ...data,
        date_working_day_time: data.data_working_day.reduce(
          (value, currentValue, currentIndex, arr) => {
            const index_day = this.getnNewDate().getDay();
            const name_day = this.getWorkingDay()[index_day];
            const date_working_day_time = `(${currentValue.open_time} - ${currentValue.close_time})`;
            const is_enable = currentValue.enable ? date_working_day_time : '';
            value = currentValue.day_name === name_day ? is_enable : value;
            return value;
          },
          '00:00-00:00'
        ),
      }))
    )
  );

  /* location */
  private latBranch = new BehaviorSubject<number>(0);
  latBranch$ = this.latBranch.asObservable();
  private lngBranch = new BehaviorSubject<number>(0);
  lngBranch$ = this.lngBranch.asObservable();
  location$ = combineLatest([this.latBranch$, this.lngBranch$]).pipe(
    map(([lat, lng]) => ({ lat, lng }))
  );
  branchsLocation$ = combineLatest([
    this.location$,
    this.getBranchsDataWorkingDay$,
  ]).pipe(
    map(([location, branchs]) =>
      branchs.map((res) => ({
        ...res,
        // NOTE cal distance_meter
        distance_meter: this.calLatLongx(
          res.location_latitude,
          res.location_longitude,
          location.lat,
          location.lng,
          'K'
        ),
      }))
    )
  );
  /* branchs => sort => distance_meter */
  branchsSortDistanceMeter$ = this.branchsLocation$.pipe(
    map((res) => {
      let sort_distance_meter: any[] = [];
      res.map((data, index) => {
        if (data.distance_meter) {
          sort_distance_meter.push(data);
          sort_distance_meter.sort(
            (a, b) => a.distance_meter - b.distance_meter
          );
        }
      });
      if (!sort_distance_meter.length) sort_distance_meter = res;
      return sort_distance_meter;
    })
  );

  private pageBranch = new BehaviorSubject<number>(0);
  pageBranch$ = this.pageBranch.asObservable();
  private perPageBranch = new BehaviorSubject<number>(10);
  perPageBranch$ = this.perPageBranch.asObservable();
  /* api=>branchsMini */
  getBranchsDataMini$ = this.branchsSortDistanceMeter$.pipe(
    map((res) =>
      res.reduce((value, currentValue, currentIndex, arr) => {
        let page = 0;
        this.perPageBranch$.pipe(take(1)).subscribe((res) => {
          page = Math.floor(currentIndex / res);
        });
        const pageBranchsArray = value;
        pageBranchsArray[page] = {
          branchs: pageBranchsArray[page]
            ? [...pageBranchsArray[page].branchs, currentValue]
            : [currentValue],
        };
        return pageBranchsArray;
      }, [])
    ),
    map((res) => [res] as [{ branchs: Datum[] }][])
  );

  /* output */
  branchs$ = combineLatest([this.pageBranch$, this.getBranchsDataMini$]).pipe(
    map(([page, branchs]) => ({ page, branchs }))
  );

  constructor(private _apiCockpit: ApiCockpitService) {}

  strReplace(str: string, re: any, to: string): string {
    return str.replace(re, to);
  }

  getnNewDate(): any {
    return new Date();
  }
  getWorkingDay(): string[] {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
  }

  sendPageIn(page: number): void {
    this.pageBranch.next(page);
  }

  default(): void {
    this.sendPageIn(0);
    this.sendPage('1');
    this.sendPerPage('300');
    this.sendIsEnable('1');
    this.sendLat('');
    this.sendLng('');
    this.sendSearch('');
  }

  sendPage(page: string): void {
    this.apiBranchs.dataSend().sendPage(page);
  }
  sendPerPage(perPage: string): void {
    this.apiBranchs.dataSend().sendPerPage(perPage);
  }
  sendIsEnable(is_enable: string): void {
    this.apiBranchs.dataSend().sendIsEnable(is_enable);
  }
  sendLat(lat: string): void {
    this.apiBranchs.dataSend().sendLat(lat);
  }
  sendLng(lng: string): void {
    this.apiBranchs.dataSend().sendLng(lng);
  }
  sendSearch(search: string): void {
    this.apiBranchs.dataSend().sendSearch(search);
  }

  /* location */
  onSendLat(lat: number): void {
    this.latBranch.next(lat);
  }
  onSendLng(lng: number): void {
    this.lngBranch.next(lng);
  }

  private calLatLongx(
    lat1: string | number,
    lon1: string | number,
    lat2: string | number,
    lon2: string | number,
    unit: string
  ): number {
    const calLatLongx = {
      lat1: +lat1,
      lon1: +lon1,
      lat2: +lat2,
      lon2: +lon2,
    };
    const theta = calLatLongx.lon1 - calLatLongx.lon2;
    let dist =
      Math.sin(this.deg2rad(calLatLongx.lat1)) *
        Math.sin(this.deg2rad(calLatLongx.lat2)) +
      Math.cos(this.deg2rad(calLatLongx.lat1)) *
        Math.cos(this.deg2rad(calLatLongx.lat2)) *
        Math.cos(this.deg2rad(theta));
    dist = Math.acos(dist);
    dist = this.rad2deg(dist);
    dist = dist * 60 * 1.1515;
    if (unit === 'K') {
      dist = dist * 1.609344;
    } else if (unit === 'N') {
      dist = dist * 0.8684;
    }
    if (
      !calLatLongx.lat1 ||
      !calLatLongx.lon1 ||
      !calLatLongx.lat2 ||
      !calLatLongx.lon2
    ) {
      return 0;
    }

    return dist;
  }

  private deg2rad(deg: number): number {
    return (deg * Math.PI) / 180.0;
  }
  private rad2deg(rad: number): number {
    return (rad * 180) / Math.PI;
  }
}
