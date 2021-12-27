import { ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

import { Observable } from 'rxjs';
import { Servicearray } from 'src/app/@core/models/salesforce-query-form.model';
import { BreakpointService } from 'src/app/@core/services/breakpoint.service';
import { SelectFormGroupBranchService } from 'src/app/@core/services/select-form-group-branch.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BranchesComponent {
  isWeb$ = this._breakpoint.isWeb$;
  @Input() isInStep!: boolean;
  @Input() salesforceQueryForms$!: Observable<any>;
  @Output() branchId = new EventEmitter<number>();

  constructor(
    private _breakpoint: BreakpointService,
    private viewportScroller: ViewportScroller,
    private selectFormGroupBranch: SelectFormGroupBranchService
  ) {}

  scrollElementId(elementId: string) {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  updateBranch(index: number, branch: Servicearray, value: string): void {
    this.scrollElementId('matStepperNext2');
    this.selectFormGroupBranch.updateBranchArray(index, branch, value);
  }
}
