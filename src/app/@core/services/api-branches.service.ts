import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { DataSend } from '../models/data-send.model';

import { DomeinApi } from '../models/api-branches.interface';
import { ApiCockpitService } from './api-cockpit.service';

@Injectable()
export class ApiBranchesService {
  private page = new BehaviorSubject<DataSend>({
    params_title: 'page',
    params_data: 1,
  });
  page$ = this.page.asObservable();
  private perPage = new BehaviorSubject<DataSend>({
    params_title: 'per_page',
    params_data: 8,
  });
  perPage$ = this.perPage.asObservable();
  private isEnable = new BehaviorSubject<DataSend>({
    params_title: 'is_enable',
    params_data: 1,
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
    switchMap(([page, per_page, is_enable, lat, lng, search]) => {
      return of([page, per_page, is_enable, lat, lng, search] as DataSend[]);
    })
  );
  getApiBranchs$ = combineLatest([this.dataSend$]).pipe(
    switchMap(([dataSend]) =>
      this._apiCockpit
        .mergeUrl({ path: 'api/branchs', params: dataSend })
        .pipe(map((res) => res as DomeinApi))
    ),
    shareReplay(1)
  );

  constructor(private _apiCockpit: ApiCockpitService) {}

  dataSend() {
    const self = this;
    const function_data_send = {
      sendPage: function (page: string | number) {
        const self_ = this;
        const data_send = { params_title: 'page', params_data: page };
        self.page.next(data_send);
      },
      sendPerPage: function (per_page: string | number) {
        const self_ = this;
        const data_send = { params_title: 'per_page', params_data: per_page };
        self.perPage.next(data_send);
      },
      sendIsEnable: function (is_enable: string | number) {
        const self_ = this;
        const data_send = { params_title: 'is_enable', params_data: is_enable };
        self.isEnable.next(data_send);
      },
      sendLat: function (lat: string | number) {
        const self_ = this;
        const data_send = { params_title: 'lat', params_data: lat };
        self.lat.next(data_send);
      },
      sendLng: function (lng: string | number) {
        const self_ = this;
        const data_send = { params_title: 'lng', params_data: lng };
        self.lng.next(data_send);
      },
      sendSearch: function (search: string | number) {
        const self_ = this;
        const data_send = { params_title: 'search', params_data: search };
        self.search.next(data_send);
      },
    };
    return function_data_send;
  }
}
