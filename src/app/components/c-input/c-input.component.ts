import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'c-input',
  templateUrl: './c-input.component.html',
  styleUrls: ['./c-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CInputComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() label!: string;
  @Input() inputType!: string;
  @Input() maxlength!: string;
  @Input() dMask!: string;
  @Input() dOnlyChar!: boolean;
  @Input() dCharNum!: boolean;
  @Input() required: boolean = false;

  showErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

}
