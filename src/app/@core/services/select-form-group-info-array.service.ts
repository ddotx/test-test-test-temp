import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Servicearray } from '../models/salesforce-query-form.model';

@Injectable()
export class SelectFormGroupInfoArrayService {
  selectFormGroup!: FormGroup;
  get controls() {
    return this.selectFormGroup.controls;
  }
  get formValueChanges() {
    return this.selectFormGroup.valueChanges;
  }
  get infoArray() {
    return this.selectFormGroup.get('info_array') as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.controlFormGroup().setup();
  }

  /* push */
  pushInfoArray(info_array: Servicearray[]): void {
    info_array.map((info) => {
      this.controlFormGroup().pushInfoArray(info);
    });
  }

  /* update */
  updateInfoArray(index: number, info: Servicearray, value: string): void {
    this.controlFormGroup().updateInfoArray(index, info, value);
  }

  controlFormGroup(): any {
    const self = this;
    const control_form_group = {
      controlsLog: (topit: string | number, data: string | number) => {
        /* console.log(topit, ' => ', data); */
      },
      subscribe: () => {
        self.formValueChanges.subscribe((res: any) => {
          self
            .controlFormGroup()
            .controlsLog('controlFormGroup : subscribe', res);
        });
      },
      setup: () => {
        self.selectFormGroup = this.formBuilder.group({
          info_array: self.formBuilder.array([], [Validators.required]),
        });
        self.controlFormGroup().subscribe();
      },
      pushBranch: (info: Servicearray) => {
        return self.formBuilder.group({
          id: [{ value: info.id, disabled: false }, []],
          name: [{ value: info.name, disabled: false }, []],
          value: [{ value: '', disabled: false }, this.getValidators(info.id)],
        }) as FormGroup;
      },
      pushInfoArray: (info: Servicearray) => {
        self.infoArray.push(self.controlFormGroup().pushBranch(info));
      },
      updateInfoArray: (index: number, info: Servicearray, value: string) => {
        self.infoArray.at(index).reset({
          id: { value: info.id, disabled: false },
          name: { value: info.name, disabled: false },
          value: { value: value, disabled: false },
        });
      },
      main: () => {},
    };
    return control_form_group;
  }

  getValidators(id: string): any {
    let validators:any = [];
    if (id === 'info_full_name') validators = [Validators.required];
    if (id === 'info_mobile')
      validators = [Validators.required, Validators.minLength(10)];
    return validators;
  }
}
