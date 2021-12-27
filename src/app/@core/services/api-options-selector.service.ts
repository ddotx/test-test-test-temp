import { Injectable } from '@angular/core';
import { filter, map, pluck, shareReplay, tap } from 'rxjs/operators';
import { DataSend } from '../models/data-send.model';
import {
  ICarsBrands,
  ICarsClasses,
  ICarsModels,
  ICarsYears,
} from '../models/options-selector.model';
import { ApiCockpitService } from './api-cockpit.service';

import * as BRANDSCAR from '../../../assets/json/car/brandscar.json'
import * as CLASSCAR from '../../../assets/json/car/classcar.json'
import * as MODELCAR from '../../../assets/json/car/modelcar.json'
import * as YEARSCAR from '../../../assets/json/car/yearscar.json'
import { from } from 'rxjs';

@Injectable()
export class ApiOptionsSelectorService {
  constructor(private _apiCockpit: ApiCockpitService) {}

  getCarsBrands() {
    // return from(Object.values(JSON.parse(JSON.stringify(BRANDSCAR)))).pipe(
    //   filter((res:any) => !!res.ok),
    //   map((res) => res as ICarsBrands),
    //   pluck('data'),
    //   shareReplay({ refCount: true, bufferSize: 1 })
    // );
    return this._apiCockpit.mergeUrl({ path: 'api/store/cars/brands' }).pipe(
      filter((res) => !!res.ok),
      map((res) => res as ICarsBrands),
      pluck('data'),
      shareReplay({ refCount: true, bufferSize: 1 })
    );
  }

  getCarsClasses(
    params: DataSend[] = [{ params_title: 'car_brand_id', params_data: -1 }]
  ) {
    return this._apiCockpit
      .mergeUrl({ path: 'api/store/cars/classes', params })
      .pipe(
        filter((res) => !!res.ok),
        map((res) => res as ICarsClasses),
        pluck('data'),
        shareReplay({ refCount: true, bufferSize: 1 })
      );
  }

  getCarsModels(
    params: DataSend[] = [
      { params_title: 'car_brand_id', params_data: -1 },
      { params_title: 'car_class', params_data: -1 },
      { params_title: 'car_year', params_data: -1 },
    ]
  ) {
    return this._apiCockpit
      .mergeUrl({ path: 'api/store/cars/models', params })
      .pipe(
        filter((res) => !!res.ok),
        map((res) => res as ICarsModels),
        pluck('data'),
        shareReplay({ refCount: true, bufferSize: 1 })
      );
  }

  getCarsYears(
    params: DataSend[] = [
      { params_title: 'car_brand_id', params_data: -1 },
      { params_title: 'car_class', params_data: -1 },
      { params_title: 'car_model', params_data: -1 },
    ]
  ) {
    return this._apiCockpit
      .mergeUrl({ path: 'api/store/cars/years', params })
      .pipe(
        filter((res) => !!res.ok),
        map((res) => res as ICarsYears),
        pluck('data'),
        shareReplay({ refCount: true, bufferSize: 1 })
      );
  }
}
