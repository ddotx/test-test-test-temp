import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class InfoComponent {
  isWeb$ = this._breakpoint.isWeb$;
  testTimeStampBS = new BehaviorSubject<Date>(new Date());

  backend$: Observable<any> | undefined;
 
  @Input() formInfo!: FormGroup;

  get isChecked$(): Observable<boolean> {
    return this.getFormInfoByName('acceptpromotion').valueChanges;
  }

  get isInStep(): boolean {
    return (
      !this.getFormInfoByName('acceptpromotion').value || this.formInfo.invalid
    );
  }

  constructor(
    private _breakpoint: BreakpointService,
    private _backend: RedeemTransactionService
  ) {
    this.testTimeStampBS.next(new Date());
  }

  ngOnInit(): void {
    this.initBackendData()
  }

  initBackendData(){
    this.backend$ =  this._backend.BackendCampaignOb$.pipe(
      pluck('label'),
      // tap((vvv) => console.log({ vvv })),
      map((value) => {
        let data: any = {};
        value.map((res: any) => {
          data[res.key] = {
            label: res.label,
            campaign_id: res.campaign_id,
            created_at: res.created_at,
            id: res.id,
            require: res.require,
            status: res.status,
            updated_at: res.updated_at,
          };
        });
        console.log({data})
        return data;
      }),
      // tap((vvv) => console.log({ vvv }))
    )
  }

  onChecked(e: any) {
    const isChecked = e.target.checked;
    this.formInfo.get('acceptpromotion')!.setValue(isChecked);
  }

  getFormInfoByName(name: string): FormControl {
    return this.formInfo.get(name) as FormControl;
  }
}
