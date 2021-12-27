import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SummaryComponent {
  isWeb$ = this._breakpoint.isWeb$;
  @Input() formInfo!: FormGroup;
  @Input() formCarinfo!: FormGroup;
  @Input() messageError: string = '';
  @Input() branchName: string = '';
  @Input() disableSubmitButton$!: BehaviorSubject<boolean>;
  @Output() onSubmitBooking = new EventEmitter<void>();

  backend$: Observable<any> | undefined;
  constructor(
    private _breakpoint: BreakpointService,
    private _backend: RedeemTransactionService
  ) {}

    ngOnInit(): void {
      this.backend$ = this._backend.BackendCampaignOb$.pipe(pluck('main'));
    }

  onSubmit() {
    this.disableSubmitButton$.next(true);
    this.onSubmitBooking.emit();
  }
}
