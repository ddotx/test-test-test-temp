import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectOption } from 'src/app/@core/models/select-option.model';

@Component({
  selector: 'c-select',
  templateUrl: './c-select.component.html',
  styleUrls: ['./c-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CSelectComponent implements OnInit {
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() width: String = 'auto';
  @Input() textAlign: String = 'left';
  @Input() background: String = '#fafafa';
  @Input() ngStyles = {};
  @Input() height!: String;

  selectFormGroup!: FormGroup;
  get controls() {
    return this.selectFormGroup.controls;
  }
  get formValueChanges() {
    return this.selectFormGroup.valueChanges;
  }

  /* label */
  _label!: string;
  get label(): string {
    return this._label;
  }
  set label(label: string) {
    this._label = label;
    this.label_.next(label);
  }
  private label_ = new BehaviorSubject<string>(this.label);
  label_$ = this.label_.asObservable();

  /* option */
  _option: string | number = '';
  @Input()
  get option(): string | number {
    return this._option;
  }
  set option(option: string | number) {
    /* */
    this._option = option;
    this.onSetTimeout(0, () => {
      this.selectFormGroup.setValue({ select: option });
    });
    this.option_.next(option);
  }
  private option_ = new BehaviorSubject<string | number>(this.option);
  option_$ = this.option_.asObservable();

  /* placeholder */
  _placeholder!: string;
  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(placeholder: string) {
    this._placeholder = placeholder;
    this.placeholder_.next(placeholder);
  }
  private placeholder_ = new BehaviorSubject<string>(this.placeholder);
  placeholder_$ = this.placeholder_.asObservable();

  /* disabled */
  _disabled!: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    this._disabled = disabled;
    this.disabled_.next(disabled);
    this._disabled = disabled;
    this.onSetTimeout(0, () => {
      if (disabled) this.controls['select'].disable();
      if (!disabled) this.controls['select'].enable();
    });
  }
  private disabled_ = new BehaviorSubject<boolean>(this.disabled);
  disabled_$ = this.disabled_.asObservable();

  /* validators */
  _validators: any; /* [Validators.required] */
  @Input()
  get validators(): any {
    return this._validators;
  }
  set validators(validators: any) {
    this._validators = validators;
    this.validators_.next(validators);
  }
  private validators_ = new BehaviorSubject<any>(this.validators);
  validators_$ = this.validators_.asObservable();

  /* submit */
  _submit: Boolean = false;
  @Input()
  get submit(): Boolean {
    return this._submit;
  }
  set submit(submit: Boolean) {
    this.submit_.next(submit);
    this._submit = submit;
  }
  private submit_ = new BehaviorSubject<Boolean>(this.submit);
  submit_$ = this.submit_.asObservable();

  /* mat_hint */
  _matHint!: string;
  @Input()
  get matHint(): string {
    return this._matHint;
  }
  set matHint(mat_hint: string) {
    this._matHint = mat_hint;
    this.matHint_.next(mat_hint);
  }
  private matHint_ = new BehaviorSubject<string>(this.matHint);
  matHint_$ = this.matHint_.asObservable();

  /* mat_error_pattern */
  _matErrorPattern!: string;
  @Input()
  get matErrorPattern(): string {
    return this._matErrorPattern;
  }
  set matErrorPattern(mat_error_pattern: string) {
    this._matErrorPattern = mat_error_pattern;
    this.matErrorPattern_.next(mat_error_pattern);
  }
  private matErrorPattern_ = new BehaviorSubject<string>(this.matErrorPattern);
  matErrorPattern_$ = this.matErrorPattern_.asObservable();

  /* mat_error_pattern */
  _matErrorRequired!: string;
  @Input()
  get matErrorRequired(): string {
    return this._matErrorRequired;
  }
  set matErrorRequired(mat_error_required: string) {
    this._matErrorRequired = mat_error_required;
    this.matErrorRequired_.next(mat_error_required);
  }
  private matErrorRequired_ = new BehaviorSubject<string>(
    this.matErrorRequired
  );
  matErrorRequired_$ = this.matErrorRequired_.asObservable();

  @Output() getChange = new EventEmitter<string | number>();

  /* none */
  _optionNone: selectOption[] = [{ value: '', title: 'None', disabled: false }];
  @Input()
  get optionNone(): selectOption[] {
    return this._optionNone;
  }
  set optionNone(option_mone: selectOption[]) {
    this._optionNone = option_mone;
    this.optionNone_.next(option_mone);
  }
  private optionNone_ = new BehaviorSubject<selectOption[]>(this.optionNone);
  optionNone_$ = this.optionNone_.asObservable();

  /* none */
  _optionArray: selectOption[] = [];
  @Input()
  get optionArray(): selectOption[] {
    return this._optionArray;
  }
  set optionArray(option_mone: selectOption[]) {
    this._optionNone = option_mone;
    this.optionNone_.next(option_mone);
  }
  private optionArray_ = new BehaviorSubject<selectOption[]>(this.optionArray);
  optionArray_$ = this.optionArray_.asObservable();

  @Output() getSelect = new EventEmitter<string | number>();

  vm$ = combineLatest([
    this.label_$,
    this.option_$,
    this.placeholder_$,
    this.disabled_$,
    this.validators_$,
    this.matHint_$,
    this.matErrorPattern_$,
    this.matErrorRequired_$,
    this.optionNone_$,
    this.optionArray_$,
  ]).pipe(
    map(
      ([
        label,
        option,
        placeholder,
        disabled,
        validators,
        matHint,
        matErrorPattern,
        matErrorRequired,
        optionNone,
        optionArray,
      ]) => ({
        label,
        option,
        placeholder,
        disabled,
        validators,
        matHint,
        matErrorPattern,
        matErrorRequired,
        optionNone,
        optionArray,
      })
    )
  );

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.controlFormGroup().setup();
  }

  onSetTimeout(timeout: number, callback: any) {
    setTimeout(() => {
      callback();
    }, timeout);
  }

  controlFormGroup() {
    const control_form_group = {
      controlsLog: (topit: string | number, data: string | number) => {
        /* console.log(topit, ' => ', data); */
      },
      subscribe: () => {
        const self = this;
        const self_ = this.controlFormGroup();
        self.formValueChanges.subscribe((res: any) => {
          self_.controlsLog('controlFormGroup : subscribe', res);
        });
      },
      setup: () => {
        const self = this;
        const self_ = this.controlFormGroup();
        self.selectFormGroup = this.formBuilder.group({
          select: [
            { value: this._option, disabled: this._disabled },
            this._validators,
          ],
        });
        self_.subscribe();
      },
      main: function () {},
    };
    return control_form_group;
  }

  selectionChange(value: string | number): void {
    this.getSelect.emit(value);
  }

  isFieldValid() {
    return {
      'has-error': this.submit && !this.selectFormGroup.valid,
    };
  }
}
