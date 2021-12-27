import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as PROVINCE from '../../../assets/json/province.json';
import { combineLatest, from, Observable, of } from 'rxjs';
import {
  filter,
  map,
  pluck,
  startWith,
  switchMap,
  take,
  tap,
  toArray,
} from 'rxjs/operators';

interface IProvinceOption {
  th: string;
  en: string;
}

@Component({
  selector: 'c-select-province',
  templateUrl: './c-select-province.component.html',
  styleUrls: ['./c-select-province.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CSelectProvinceComponent {
  @Input() label: string = '';
  @Input() control = new FormControl();
  options$ = from(Object.values(JSON.parse(JSON.stringify(PROVINCE)))).pipe(
    pluck('name'),
    map((res) => res as IProvinceOption),
    filter((res) => !!res && !!res.th && !!res.en),
    toArray(),
    map((opts) => this._sortProvinceOptions(opts, 'th')),
    map((options) => options.map((opt:any) => opt.th)),
    take(1)
  );

  private _sortProvinceOptions(opts:any, lang:any) {
    return opts.sort((a:any, b:any) => a[lang].codePointAt(0) - b[lang].codePointAt(0));
  }

  // filteredOptions$: Observable<IProvinceOption[]>

  // ngOnInit(): void {
  //   this.filteredOptions$ = this.control.valueChanges.pipe(
  //     startWith(''),
  //     switchMap((value) => this._filter(value)),
  //     map((options) => options.map((opt) => opt.th))
  //   );
  // }

  // private _onMatching(filterValue): (option: IProvinceOption) => boolean {
  //   return (option) =>
  //     !!~option.th.indexOf(filterValue) ||
  //     !!~option.en.toLowerCase().indexOf(filterValue);
  // }

  // private _filter(value: string): Observable<IProvinceOption[]> {
  //   const filterValue$ = of(value.toLowerCase());
  //   return combineLatest([this.options$, filterValue$]).pipe(
  //     map(([options, filterValue]) => {
  //       const isMatched = this._onMatching(filterValue);
  //       return options.filter(isMatched);
  //     })
  //   );
  // }
}
