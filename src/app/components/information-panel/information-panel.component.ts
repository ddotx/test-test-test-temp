import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';

@Component({
  selector: 'information-panel',
  templateUrl: './information-panel.component.html',
  styleUrls: ['./information-panel.component.scss'],
})
export class InformationPanelComponent implements OnInit {
  panelOpenState = false;
  isWeb$ = this._breakpoint.isWeb$;

  backend$: Observable<any> | undefined;

  constructor(
    private _breakpoint: BreakpointService,
    private _backend: RedeemTransactionService
  ) {}

  ngOnInit(): void {
    this.backend$ = this._backend.BackendCampaignOb$.pipe(pluck('main'));
  }
}
