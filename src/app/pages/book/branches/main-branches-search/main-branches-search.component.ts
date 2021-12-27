/// <reference types="@types/googlemaps" />

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from 'rxjs/operators';

import { TypeSearchService } from './type-search.service';
import { PositionService } from './position.service';
import { FormControl } from '@angular/forms';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';

@Component({
  selector: 'app-main-branches-search',
  templateUrl: './main-branches-search.component.html',
  styleUrls: ['./main-branches-search.component.scss'],
  providers: [TypeSearchService, PositionService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainBranchesSearchComponent implements OnDestroy {
  isWeb$ = this._breakpoint.isWeb$;
  @Output() getTypeId = new EventEmitter<string>();
  @Output() getLat = new EventEmitter<number>();
  @Output() getlng = new EventEmitter<number>();
  @Output() getSearchText = new EventEmitter<string>();

  @ViewChild('searchAddress') searchAddress!: ElementRef;

  private lat = new BehaviorSubject<number>(0);
  lat$ = this.lat.asObservable();
  private lng = new BehaviorSubject<number>(0);
  lng$ = this.lng.asObservable();

  private searchText = new BehaviorSubject<string>('');
  searchText$ = this.searchText.asObservable();

  formSearchAddress = new FormControl('');
  search$ = this.typeSearch.search$;

  private _onDestroy = new Subject<void>();

  vm$ = combineLatest([
    this.search$,
    this.lat$,
    this.lng$,
    this.searchText$,
  ]).pipe(
    map(([search, lat, lng, search_text]) => ({
      search,
      lat,
      lng,
      search_text,
    })),
    tap((vm) => console.log({ vm }))
  );

  constructor(
    private typeSearch: TypeSearchService,
    private position: PositionService,
    private _breakpoint: BreakpointService
  ) {}

  sendTypeId(type_id: number | any): void {
    this.formSearchAddress.setValue('');
    this.getTypeId.emit(type_id);
    /* */
    this.onSendLatLng(0, 0);
    this.searchText.next('');
    /* */
    this.typeSearch.sendTypeId(type_id);
  }

  /* type-0 */
  ngAfterViewInit(): void {
    this.onSearchAddress();
    this.formSearchAddress.valueChanges
      .pipe(
        distinctUntilChanged(),
        tap((_) => this._triggerGoogleMap()),
        debounceTime(500),
        takeUntil(this._onDestroy)
      )
      .subscribe();
  }

  private onSearchAddress(): void {
    const input = this.searchAddress.nativeElement;
    const searchBox = new google.maps.places.SearchBox(input);
    searchBox.addListener('places_changed', () => {
      const places = searchBox.getPlaces();
      if (!places!.length) return;
      this.outPlaceResult(places![0]);
    });
  }

  private outPlaceResult(place_result: google.maps.places.PlaceResult): void {
    const location = place_result.geometry!.location!.toJSON();
    this.lat.next(location.lat);
    this.lng.next(location.lng);
  }

  onSendLatLng(lat: number, lng: number): void {
    this.getLat.emit(lat);
    this.getlng.emit(lng);
  }

  /* type-1 */
  onSearchText(search_text: string | any): void {
    this.searchText.next(search_text);
  }
  onSendSearchText(search_text: string): void {
    if (search_text) this.getSearchText.emit(search_text);
  }

  private _triggerGoogleMap() {
    const input = this.searchAddress.nativeElement;
    google.maps.event.trigger(input, 'focus', {});
    google.maps.event.trigger(input, 'keydown', { keyCode: 13 });
    google.maps.event.trigger(this, 'focus', {});
  }

  /* send */
  onSendSearch(
    type_id: number,
    lat: number,
    lng: number,
    search_text: string
  ): void {
    if (type_id === 0) {
      // google.maps.event.trigger(this.searchBox, 'places_changed');
      if (lat && lng) this.onSendLatLng(lat, lng);
      else this.onSendSearchText(this.searchAddress.nativeElement.value);
    }
    if (type_id === 1) this.onSendSearchText(search_text);
  }
  /* position */
  onGetPosition(): void {
    // this.sendTypeId(0);
    this.position.getPosition((res: any) => {
      // alert(`latitude,longitude => ${res.latitude},${res.longitude}`)
      this.onSendLatLng(res.latitude, res.longitude);
    });
  }

  ngOnDestroy(): void {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
}
