import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Datum } from 'src/app/@core/models/main-branches.model';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';


@Component({
  selector: 'app-main-branches-card',
  templateUrl: './main-branches-card.component.html',
  styleUrls: ['./main-branches-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MainBranchesCardComponent {
  isWeb$ = this._breakpoint.isWeb$;
  @Input() item!: Datum;
  @Input() disableButton!: boolean;

  _active!: boolean;
  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(active: boolean) {
    this._active = active;
    switch (active) {
      case true:
        this.borderWidth.next('0');
        this.borderColor.next('');
        this.color.next('white');
        this.background.next('#333333');
        break;
      default:
        this.borderWidth.next('0.5px');
        this.borderColor.next('#8d8d8d');
        this.color.next('#423f3f');
        this.background.next('#ffffff');
        break;
    }
  }
  private borderWidth = new BehaviorSubject<string>('');
  borderWidth$ = this.borderWidth.asObservable();
  private borderColor = new BehaviorSubject<string>('');
  borderColor$ = this.borderColor.asObservable();
  private color = new BehaviorSubject<string>('');
  color$ = this.color.asObservable();
  private background = new BehaviorSubject<string>('');
  background$ = this.background.asObservable();

  @Output() getBranchsId = new EventEmitter<number>();
  @Output() getBranchsTitle = new EventEmitter<string>();

  vm$ = combineLatest([
    this.borderWidth$,
    this.borderColor$,
    this.color$,
    this.background$,
  ]).pipe(
    map(([borderWidth, borderColor, color, background]) => ({
      borderWidth,
      borderColor,
      color,
      background,
    }))
  );

  constructor(private _breakpoint: BreakpointService) {}

  onSendBranchs(id: number, title: string): void {
    this.getBranchsId.emit(id);
    this.getBranchsTitle.emit(title);
  }
}
