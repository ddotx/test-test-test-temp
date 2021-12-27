import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map, pluck, shareReplay } from 'rxjs/operators';
import { ApiCockpitService } from './api-cockpit.service';
import {
  Data,
  DomeinApi,
  Servicearray,
} from '../models/salesforce-query-form.model';

@Injectable()
export class SalesforceQueryFormService {
  /* api */
  getApiSalesforceQueryForm$ = this._apiCockpit
    .mergeUrl({
      path: 'api/salesforce/query/form',
      params: [
        {
          params_title: 'lang',
          params_data: 'th',
        },
      ],
    })
    .pipe(
      map((res) => res as DomeinApi),
      shareReplay(1)
    );

  /* api=>data */
  getApiSalesforceQueryFormData$ = this.getApiSalesforceQueryForm$.pipe(
    pluck('data')
  );
  /* api=>service_array */
  getApiSalesforceQueryFormServiceArray$ =
    this.getApiSalesforceQueryFormData$.pipe(pluck('service_array'));
  /* api=>branch_array */
  getApiSalesforceQueryFormBranchArray$ =
    this.getApiSalesforceQueryFormData$.pipe(pluck('branch_array'));
  /* api=>branch_array=>branch_name */
  getApiSalesforceQueryFormBranchName$ =
    this.getApiSalesforceQueryFormBranchArray$.pipe(
      map((res: any) =>
        res
          .map((data:any) => ({
            ...data,
            required: this.getRequired(data.id),
            validators: this.getValidators(data.id),
            column: this.getColumn(data.id),
            is_display: this.getIsDisplay(data.id),
            mask: this.getMask(data.id),
            replace: this.getReplace(data.id),
            disabled: this.getDisplay(data.id),
          }))
          .filter((data:any) => data.id === 'branch_name')
      )
    );
  /* api=>branch_array=>branch_date_time */
  getApiSalesforceQueryFormBranchDateTime$ =
    this.getApiSalesforceQueryFormBranchArray$.pipe(
      map((res: any) =>
        res
          .map((data:any) => ({
            ...data,
            required: this.getRequired(data.id),
            validators: this.getValidators(data.id),
            column: this.getColumn(data.id),
            is_display: this.getIsDisplay(data.id),
            mask: this.getMask(data.id),
            replace: this.getReplace(data.id),
            disabled: this.getDisplay(data.id),
          }))
          .filter((data:any) => data.id === 'branch_date_time')
      )
    );
  /* api=>info_array */
  getApiSalesforceQueryFormInfoArray$ =
    this.getApiSalesforceQueryFormData$.pipe(
      map((res: any) =>
        res.info_array.map((data:any) => ({
          ...data,
          required: this.getRequired(data.id),
          validators: this.getValidators(data.id),
          column: this.getColumn(data.id),
          is_display: this.getIsDisplay(data.id),
          mask: this.getMask(data.id),
          replace: this.getReplace(data.id),
          disabled: this.getDisplay(data.id),
        }))
      )
    );
  /* output */
  salesforceQueryForm$ = combineLatest([
    this.getApiSalesforceQueryFormServiceArray$,
    this.getApiSalesforceQueryFormBranchArray$,
    this.getApiSalesforceQueryFormBranchName$,
    this.getApiSalesforceQueryFormBranchDateTime$,
    this.getApiSalesforceQueryFormInfoArray$,
  ]).pipe(
    map(
      ([
        service_array,
        branch_array,
        branch_name,
        branch_date_time,
        info_array,
      ]) => ({
        service_array,
        branch_array,
        branch_name,
        branch_date_time,
        info_array,
      })
    )
  );

  constructor(private _apiCockpit: ApiCockpitService) {}

  getReplace(id: string): any {
    let replace: any;
    // if (id === 'info_first_name') replace = /[^a-zA-Zก-๏]*/g;
    // if (id === 'info_last_name') replace = /[^a-zA-Zก-๏]*/g;
    return replace;
  }

  getRequired(id: string): Boolean {
    return [
      'branch_name',
      'branch_date_time',
      'info_first_name',
      'info_last_name',
      'info_mobile',
    ].includes(id);
  }

  getValidators(id: string): any {
    return [
      'branch_name',
      'branch_date_time',
      'info_first_name',
      'info_last_name',
      'info_mobile',
    ].includes(id)
      ? [Validators.required]
      : [];
  }

  getColumn(id: string): string {
    return [
      'info_first_name',
      'info_last_name',
      'info_mobile',
      'info_email',
    ].includes(id)
      ? '6'
      : '12';
  }

  getIsDisplay(id: string): Boolean {
    let is_display = true;
    if (id === 'info_customer_id') is_display = false;
    return is_display;
  }

  getDisplay(id: string): Boolean {
    let is_display = false;
    return is_display;
  }

  getMask(id: string): any {
    let mask = '';
    if (id === 'info_mobile') mask = '000-000-0000';
    return mask;
  }
}
