import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CockpitBranchesService } from 'src/app/@core/services/cockpit-branches.service';

@Component({
  selector: 'app-main-branches',
  templateUrl: './main-branches.component.html',
  styleUrls: ['./main-branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainBranchesComponent {
  @Output() getBranchsTitle = new EventEmitter<string>();
  @Output() branchId = new EventEmitter<number>();

  branchs$ = this.branchs.branchs$;

  private branchsId = new BehaviorSubject<number>(0);
  branchsId$ = this.branchsId.asObservable();
  private branchsTitle = new BehaviorSubject<string>('');
  branchsTitle$ = this.branchsTitle.asObservable();
  disableButton$ = new BehaviorSubject<any>(false);

  vm$ = combineLatest([this.branchs$, this.branchsId$]).pipe(
    map(([branchs, branchs_id]) => ({
      branchs,
      branchs_id,
    }))
  );

  constructor(private branchs: CockpitBranchesService) {}

  onTypeId(type_id: string): void {
    if (type_id) {
      this.disableButton$.next(true);
    }
    this.branchs.default();
  }

  onSendBranchsId(branchs_id: number): void {
    this.branchsId.next(branchs_id);
    this.branchId.emit(branchs_id);
  }
  onSendBranchsTitle(branchs_title: string): void {
    this.branchsTitle.next(branchs_title);
    this.getBranchsTitle.emit(branchs_title);
  }

  /* type-0 */
  onSendLat(lat: number): void {
    this.selectPage(0);
    this.branchs.onSendLat(lat);
  }
  onSendLng(lng: number): void {
    this.selectPage(0);
    this.branchs.onSendLng(lng);
  }

  /* type-1 */
  onSendSearchText(search_text: string): void {
    this.selectPage(0);
    this.branchs.sendSearch(search_text);
  }

  /* */
  onLeft(page: number, page_max: any): void {
    if (page !== 0) this.selectPage(page - 1);
  }

  onRight(page: number, page_max: any): void {
    if (page < page_max.length - 1) this.selectPage(page + 1);
  }

  selectPage(page: number) {
    this.branchs.sendPageIn(page);
  }
}
