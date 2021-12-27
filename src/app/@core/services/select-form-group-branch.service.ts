import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Servicearray } from '../models/salesforce-query-form.model';

@Injectable()
export class SelectFormGroupBranchService {
  selectFormGroup: FormGroup = this.formBuilder.group({});
  get controls() {
    return this.selectFormGroup.controls;
  }
  get formValueChanges() {
    return this.selectFormGroup.valueChanges;
  }
  get branchArray() {
    return this.selectFormGroup.get('branch_array') as FormArray;
  }

  private branchNameText = new BehaviorSubject<string>('');
  branchNameText$ = this.branchNameText.asObservable();

  constructor(private formBuilder: FormBuilder) {
    this.controlFormGroup().setup();
  }

  /* push */
  pushBranchArray(branch_array: Servicearray[]): void {
    branch_array.map((branch) => {
      this.controlFormGroup().pushBranchArray(branch);
    });
  }

  /* update */
  updateBranchArray(index: number, branch: Servicearray, value: string): void {
    this.controlFormGroup().updateBranchArray(index, branch, value);
  }

  controlFormGroup(): any {
    const self = this;
    const control_form_group = {
      controlsLog: (topit: string | number, data: string | number) => {},
      subscribe: () => {
        self.formValueChanges.subscribe((res: any) => {
          self
            .controlFormGroup()
            .controlsLog('controlFormGroup : subscribe', res);
          self.branchNameText.next(
            self.convertArrayToTextId(res.branch_array, 'branch_name')
          );
        });
      },
      setup: () => {
        self.selectFormGroup = this.formBuilder.group({
          branch_array: self.formBuilder.array([], [Validators.required]),
        });
        self.controlFormGroup().subscribe();
      },
      pushBranch: (branch: Servicearray) => {
        return self.formBuilder.group({
          id: [{ value: branch.id, disabled: false }, [Validators.required]],
          name: [
            { value: branch.name, disabled: false },
            [Validators.required],
          ],
          value: [{ value: '', disabled: false }, [Validators.required]],
        }) as FormGroup;
      },
      pushBranchArray: (branch: Servicearray) => {
        self.branchArray.push(self.controlFormGroup().pushBranch(branch));
      },
      updateBranchArray: (
        index: number,
        branch: Servicearray,
        value: string
      ) => {
        self.branchArray.at(index).reset({
          id: { value: branch.id, disabled: false },
          name: { value: branch.name, disabled: false },
          value: { value: value, disabled: false },
        });
      },
      main: () => {},
    };
    return control_form_group;
  }

  convertArrayToTextId = (array: Servicearray[], id: string) => {
    const initialValue = '';
    return array.reduce((text:any, item, index) => {
      return item.id === id ? item.value : text;
    }, initialValue);
  };
}
