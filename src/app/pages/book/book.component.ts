import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { BehaviorSubject, combineLatest, of, Subject, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SalesforceQueryFormService } from 'src/app/@core/services/salesforce-query-form.service';
import { SelectFormGroupBranchService } from 'src/app/@core/services/select-form-group-branch.service';
import { SelectFormGroupBranchDateTimeService } from 'src/app/@core/services/select-form-group-branch-date-time.service';
import { SelectFormGroupInfoArrayService } from 'src/app/@core/services/select-form-group-info-array.service';
import {
  RedeemTransactionService,
  ResStatus,
} from 'src/app/@core/services/redeem-transaction.service';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { Servicearray } from 'src/app/@core/models/salesforce-query-form.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BookComponent implements OnInit, OnDestroy {
  isWeb$ = this._breakpoint.isWeb$;
  informationForm = this._fb.group({
    firstname: ['', [Validators.required]],
    lastname: ['', Validators.required],
    phonenumber: ['', [Validators.required, Validators.min(10)]],
    registration: ['', Validators.required],
    provinceregistration: ['', Validators.required],
    acceptpromotion: false,
  });
  carinfo = this._fb.group({
    carband: ['', Validators.required],
    caryear: ['', Validators.required],
    carmodel: ['', Validators.required],
    carmodelabbreviation: [''],
    tireband: ['', Validators.required],
    frontTiresize: [''],
    backTiresize: [''],
  });
  branchName!: string;
  branchId!: number;
  messageError$ = new BehaviorSubject<string | any>('');
  private _onDestroy = new Subject<void>();

  salesforceQueryForm$ = new BehaviorSubject<any>([]);
  startSalesforceQueryForms$ = new BehaviorSubject<number>(0);
  salesforceQueryForms$ = combineLatest([
    this.salesforceQueryForm$.asObservable(),
    this.startSalesforceQueryForms$.asObservable(),
  ]).pipe(map(([x, y]) => x));
  disableSubmitButton$ = new BehaviorSubject<boolean>(false);

  constructor(
    private _fb: FormBuilder,
    private salesforceQueryForm: SalesforceQueryFormService,
    private selectFormGroupBranch: SelectFormGroupBranchService,
    private selectFormGroupBranchDateTime: SelectFormGroupBranchDateTimeService,
    private selectFormGroupInfoArray: SelectFormGroupInfoArrayService,
    private router: Router,
    private route: ActivatedRoute,
    private redeemTransaction: RedeemTransactionService,
    private _breakpoint: BreakpointService
  ) {}

  ngOnInit(): void {
    this.initSalesforceQueryForm();
    this.selectFormGroupBranch.branchArray.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe((branches) => (this.branchName = branches[0].value));
  }

  initSalesforceQueryForm(): void {
    this.salesforceQueryForm.salesforceQueryForm$
      .pipe(
        tap((res) => {
          /* step 2 */
          this.pushBranch(res.branch_name);
          /* step 3 */
          this.pushBranchDateTime(res.branch_date_time);
          /* step 4 */
          this.pushInfoArray(res.info_array);
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe(
        (res) => {
          this.salesforceQueryForm$.next(res);
          this.startSalesforceQueryForms$.next(1);
        },
        (err) => console.error(err),
        () => {}
      );
  }

  pushBranch(branch_array: Servicearray[]): void {
    this.selectFormGroupBranch.pushBranchArray(branch_array);
  }

  pushBranchDateTime(branch_array: Servicearray[]): void {
    this.selectFormGroupBranchDateTime.pushBranchArray(branch_array);
  }

  pushInfoArray(info_array: Servicearray[]): void {
    this.selectFormGroupInfoArray.pushInfoArray(info_array);
  }

  onSubmit() {
    // const {
    //   phonenumber: mobile,
    //   registration: license_number,
    //   provinceregistration: license_province,
    //   ...username
    // } = this.informationForm.getRawValue();

    // const {
    //   carband: car_brand,
    //   carmodel: car_model,
    //   carmodelabbreviation: car_sub_model,
    //   caryear: car_year,
    //   tireband: tire_brand,
    //   frontTiresize: tire_front,
    //   backTiresize: tire_rear,
    // } = this.carinfo.getRawValue();

    // this.redeemTransaction
    //   .postSumitCampaign({
    //     ...username,
    //     mobile,
    //     license_number,
    //     license_province,
    //     car_brand,
    //     car_model,
    //     car_sub_model,
    //     car_year,
    //     tire_brand,
    //     tire_front,
    //     tire_rear,
    //     branch_id: this.branchId,
    //   })
    //   .pipe(
    //     map((res) => this.redeemTransaction.storeResponseStatus(res)),
    //     tap(
    //       (status) =>
    //         status === ResStatus.Fail &&
    //         this.router.navigate(['status', 'fail'])
    //     ),
    //     // filter((status) => status !== ResStatus.Fail),
    //     map((status) => {
    //       switch (status) {
    //         case ResStatus.FullLicence: {
    //           this.messageError$.next(
    //             'ขออภัยหมายเลขทะเบียนรถของท่าน ได้ทำการลงทะเบียนไปแล้ว กรุณาแก้ไขข้อมูลหรือติดต่อ Call center 1369'
    //           );
    //           return false;
    //         }
    //         case ResStatus.FullMobile: {
    //           this.messageError$.next(
    //             'ขออภัยหมายเลขโทรศัพท์ของท่าน ได้ทำการลงทะเบียนไปแล้ว กรุณาแก้ไขข้อมูลหรือติดต่อ Call center 1369'
    //           );
    //           return false;
    //         }
    //         default: {
    //           return true;
    //         }
    //       }
    //     }),
    //     switchMap((next) => {
    //       if (!next) {
    //         return timer(500).pipe(
    //           tap((_) => this.disableSubmitButton$.next(false))
    //         );
    //       }
    //       return of(next);
    //     })
    //   )
    //   .subscribe(
    //     (res) => {
    //       if (res) {
    //         console.warn('---success to /complete---', res);
    //         this.router.navigate(['..', 'complete'], {
    //           relativeTo: this.route,
    //         });
    //       }
    //     },
    //     (err) => {},
    //     () => {}
    //   );
    this.router.navigate(['..', 'complete'], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
