import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'c-autocomplete',
  templateUrl: './c-autocomplete.component.html',
  styleUrls: ['./c-autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CAutocompleteComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control = new FormControl();
  @Input() options: Observable<string[]> = of([]);
  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      switchMap((value) => this._filter(value))
    );
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.options.pipe(
      map((opts) =>
        opts.filter((option) => !!~option.toLowerCase().indexOf(filterValue))
      )
    );
  }
}
