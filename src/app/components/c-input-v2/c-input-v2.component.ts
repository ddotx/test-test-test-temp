import { BehaviorSubject, combineLatest } from 'rxjs';
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

import { map } from 'rxjs/operators';

@Component({
  selector: 'c-input-v2',
  templateUrl: './c-input-v2.component.html',
  styleUrls: ['./c-input-v2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CInputV2Component implements OnInit {
  @Input() labelFontWeight: string = '300';
  @Input() labelFontSize: string = '12px';
  @Input() maxlength: string = '';
  @Input() replace: any;
  @Input() mask: string = '';
  @Input() thousandSeparator: string = '';
  @Input() height!: String;
  @Input() padding: String = '0';
  @Input() margin: String = '0';
  @Input() width: String = 'auto';
  @Input() textAlign: String = 'left';
  @Input() color: String = 'black';
  @Input() background: String = '#fafafa';
  @Input() border!: String;
  @Input() paddingInput!: String;
  @Input() ngStyles = {};

  @Output() getChange = new EventEmitter<string | number>();

  selectFormGroup!: FormGroup;
  get controls() {
    return this.selectFormGroup.controls;
  }
  get formValueChanges() {
    return this.selectFormGroup.valueChanges;
  }

  /* label */
  _label!: string;
  @Input()
  get label(): string {
    return this._label;
  }
  set label(label: string) {
    this._label = label;
    this.label_.next(label);
  }
  private label_ = new BehaviorSubject<string>(this.label);
  label_$ = this.label_.asObservable();

  /* input */
  _input: string | number = '';
  @Input()
  get input(): string | number {
    return this._input;
  }
  set input(input: string | number) {
    /* */
    this._input = input;
    if (input)
      this.onSetTimeout(0, () => {
        this.selectFormGroup.setValue({ input: input });
      });
    this.input_.next(input);
  }
  private input_ = new BehaviorSubject<string | number>(this.input);
  input_$ = this.input_.asObservable();

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
    this.onSetTimeout(0, () => {
      if (disabled) this.controls['input'].disable();
      if (!disabled) this.controls['input'].enable();
    });
  }
  private disabled_ = new BehaviorSubject<boolean>(this.disabled);
  disabled_$ = this.disabled_.asObservable();

  _required: Boolean = false;
  @Input()
  get required(): Boolean {
    return this._validators;
  }
  set required(required: Boolean) {
    this._required = required;
    this.required_.next(required);
  }
  private required_ = new BehaviorSubject<Boolean>(this.required);
  required_$ = this.required_.asObservable();

  /* validators */
  _validators: any;
  @Input()
  get validators(): any {
    return this._validators; /* [Validators.required] */
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

  vm$ = combineLatest([
    this.required_$,
    this.label_$,
    this.input_$,
    this.placeholder_$,
    this.disabled_$,
    this.validators_$,
    this.matHint_$,
    this.matErrorPattern_$,
    this.matErrorRequired_$,
  ]).pipe(
    map(
      ([
        required,
        label,
        input,
        placeholder,
        disabled,
        validators,
        matHint,
        matErrorPattern,
        matErrorRequired,
      ]) => ({
        required,
        label,
        input,
        placeholder,
        disabled,
        validators,
        matHint,
        matErrorPattern,
        matErrorRequired,
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
      controlsLog: (topit: string | number, data: string | number) => {},
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
          input: [
            { value: this._input, disabled: this._disabled },
            this.validators,
          ],
        });
        self_.subscribe();
      },
      main: function () {},
    };
    return control_form_group;
  }

  onModelChange(value: string | number): void {
    this.getChange.emit(value);
  }

  isFieldValid() {
    return {
      'has-error': this.submit && !this.selectFormGroup.valid,
    };
  }
}
