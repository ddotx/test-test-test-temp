import { Injectable } from '@angular/core';


import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectOption } from 'src/app/@core/models/select-option.model';

@Injectable()
export class TypeSearchService {
  private typeId = new BehaviorSubject<number>(1);
  typeId$ = this.typeId.asObservable();

  typeSearchMain: selectOption[] = [
    // { value: 0, title: 'ค้นหาจากชื่อสถานที่บนแผนที่', disabled: false },
    { value: 1, title: 'ค้นหาจากชื่อศูนย์บริการ', disabled: false },
  ];
  private typeSearch = new BehaviorSubject<selectOption[]>(this.typeSearchMain);
  typeSearch$ = this.typeSearch.asObservable();

  /* output */
  search$ = combineLatest([this.typeId$, this.typeSearch$]).pipe(
    map(([typeId, search]) => ({ typeId, search }))
  );

  sendTypeId(type_id: number): void {
    this.typeId.next(type_id);
  }
}
