import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { BehaviorSubject, from, merge, Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  pluck,
  startWith,
  switchMap,
  takeUntil,
  tap,
  toArray,
} from 'rxjs/operators';
import { ApiOptionsSelectorService } from 'src/app/@core/services/api-options-selector.service';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { RedeemTransactionService } from 'src/app/@core/services/redeem-transaction.service';
import { objToDataSend } from 'src/app/@core/utils/obj-to-datasend.utils';
import * as TIREBRAND from '../../../../assets/json/tire/tiresbrand.json';

interface IParamsCarsModels {
  car_brand_id: number;
  car_class: number;
  car_year?: number;
}

interface IParamsCarsYears {
  car_brand_id: number;
  car_class: number;
  car_model?: number;
}

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.scss'],
  providers: [ApiOptionsSelectorService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CarInfoComponent implements OnInit, OnDestroy {
  isWeb$ = this._breakpoint.isWeb$;
  @Input() formCarinfo!: FormGroup;
  @Input() infoForm!: FormGroup;

  carsBrands$ = this._apiOpt.getCarsBrands();

  optionCarsBrands$ = this.carsBrands$.pipe(
    map((opts: any) => opts.map((opt: any) => opt.name))
  );

  private _onCarsClasses$ = (params: { car_brand_id: number }) =>
    this._apiOpt.getCarsClasses(objToDataSend(params));
  private _optionCarsClasses$ = new BehaviorSubject<string[]>([]);
  optionCarsClasses$ = this._optionCarsClasses$.asObservable();

  private _onCarsModels$ = (params: IParamsCarsModels) =>
    this._apiOpt.getCarsModels(objToDataSend(params));
  private _optionCarsModel$ = new BehaviorSubject<string[]>([]);
  optionCarsModel$ = this._optionCarsModel$.asObservable();

  private _onCarsYears$ = (params: IParamsCarsYears) =>
    this._apiOpt.getCarsYears(objToDataSend(params));
  private _optionCarsYears$ = new BehaviorSubject<string[]>([]);
  optionCarsYears$ = this._optionCarsYears$.asObservable();

  private _params: any = {
    car_brand_id: -1,
    car_class: -1,
    car_year: -1,
    car_model: -1,
  };
  tireOptions$ = from(
    Object.values(JSON.parse(JSON.stringify(TIREBRAND)))
  ).pipe(map((res: any) => res.brands));
  private _onDestroy = new Subject<void>();

  get isInStep(): boolean {
    return this.formCarinfo.invalid;
  }
  backend$: Observable<any> | undefined;
  constructor(
    private _breakpoint: BreakpointService,
    private _apiOpt: ApiOptionsSelectorService,
    private _backend: RedeemTransactionService
  ) {}

  ngOnInit(): void {
    this.theFactoryFunc().subscribe();
    this.initBackendData();
  }

  getFormCarInfoByName(name: string): FormControl {
    return this.formCarinfo.get(name) as FormControl;
  }

  initBackendData() {
    this.backend$ = this._backend.BackendCampaignOb$.pipe(
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
        console.log({ data });
        return data;
      })
      // tap((vvv) => console.log({ vvv }))
    );
  }

  theFactoryFunc() {
    const getCarBandId$ = (carBrandName: any) =>
      this.carsBrands$.pipe(
        map((carsBrands) =>
          carsBrands.find(({ name }) => name === carBrandName)
        ),
        filter((carBrand) => !!carBrand),
        pluck('id')
      );
    const getCarsClassessName = (car_brand_id: any) =>
      this._onCarsClasses$({ car_brand_id }).pipe(
        map((carsClassess) => carsClassess.map((c) => c.class))
      );
    const onCarBand$ = this.formCarinfo.get('carband')!.valueChanges.pipe(
      switchMap((carBrandName) => getCarBandId$(carBrandName)),
      filter((carBandId) => carBandId !== this._params.car_brand_id),
      tap((_) => {
        this.formCarinfo.get('carmodel')!.patchValue('', { onlySelf: true });
        this.formCarinfo
          .get('carmodelabbreviation')!
          .patchValue('', { onlySelf: true });
        this.formCarinfo.get('caryear')!.patchValue('', { onlySelf: true });
      }),
      tap((carBrandId) => (this._params.car_brand_id = carBrandId)),
      switchMap((car_brand_id) => getCarsClassessName(car_brand_id)),
      tap((carsClassess) => this._optionCarsClasses$.next(carsClassess))
    );

    const getCarsModelsName = (carModel: any) => {
      this._params.car_class = carModel;
      const { car_brand_id, car_class } = this._params;
      return this._onCarsModels$({ car_brand_id, car_class }).pipe(
        map((carsModels) => carsModels.map((carModel) => carModel.model))
      );
    };
    const onCarClasses$ = this.formCarinfo.get('carmodel')!.valueChanges.pipe(
      filter((carClass) => carClass !== this._params.car_class),
      tap((_) => {
        this.formCarinfo
          .get('carmodelabbreviation')!
          .patchValue('', { onlySelf: true });
        this.formCarinfo.get('caryear')!.patchValue('', { onlySelf: true });
      }),
      switchMap((carModel) => getCarsModelsName(carModel)),
      tap((carsModels) => this._optionCarsModel$.next(carsModels)),
      switchMap((_) => getCarsYearsName('')),
      tap((carsYears) => this._optionCarsYears$.next(carsYears))
    );

    const getCarsYearsName = (carModel: any) => {
      this._params.car_model = carModel;
      const { car_brand_id, car_class, car_model } = this._params;
      return this._onCarsYears$({
        car_brand_id,
        car_class,
        car_model,
      }).pipe(map((carsYears) => carsYears.map((carYear) => carYear.year)));
    };
    const onCarModel$ = this.formCarinfo
      .get('carmodelabbreviation')!
      .valueChanges.pipe(
        filter((carModel) => carModel !== this._params.car_model),
        tap((_) => {
          this.formCarinfo.get('caryear')!.patchValue('', { onlySelf: true });
        }),
        switchMap((carModel) => getCarsYearsName(carModel)),
        tap((carsYears) => this._optionCarsYears$.next(carsYears))
      );

    return merge(onCarBand$, onCarClasses$, onCarModel$).pipe(
      takeUntil(this._onDestroy)
    );
  }

  onBackStep() {
    this.infoForm.get('acceptpromotion')!.setValue(false);
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
