import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataSend } from '../models/data-send.model';

@Injectable({ providedIn: 'root' })
export class ApiCockpitService {
  private _rootPath = 'https://dev.cockpit.bridgestoneth.com';

  constructor(private http: HttpClient) {}

  mergeUrl({
    method = 'get',
    path,
    params,
    data,
  }: {
    method?: string;
    path: string;
    params?: DataSend[];
    data?: any;
  }): Observable<any> {
    const url = `${this._rootPath}/${path}${this.urlParams(params)}`;
    const getHttp:any = {
      get: (_:any) => this.http.get(url),
      post: (body:any) => this.http.post(url, body),
      put: (body:any) => this.http.put(url, body),
    };
    return getHttp[method](data);
  }

  urlParams(data_send: DataSend[] = []) {
    if (!data_send.length) return '';
    return data_send.reduce((url_params, params_array) => {
      return (url_params += url_params
        ? `&${params_array.params_title}=${params_array.params_data}`
        : `?${params_array.params_title}=${params_array.params_data}`);
    }, '');
  }
}
