import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { InfoComponent } from './info/info.component';
import { CarInfoComponent } from './car-info/car-info.component';
import { BranchesComponent } from './branches/branches.component';
import { SummaryComponent } from './summary/summary.component';

import { MatStepperModule } from '@angular/material/stepper';

import { MainBranchesComponent } from './branches/main-branches/main-branches.component';
import { MainBranchesSearchComponent } from './branches/main-branches-search/main-branches-search.component';
import { MainBranchesCardComponent } from './branches/main-branches-card/main-branches-card.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BootstrapLayoutModule } from 'src/app/@core/directives/bootstrap-layout/bootstrap-layout.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { SalesforceQueryFormService } from 'src/app/@core/services/salesforce-query-form.service';
import { SelectFormGroupBranchService } from 'src/app/@core/services/select-form-group-branch.service';
import { SelectFormGroupBranchDateTimeService } from 'src/app/@core/services/select-form-group-branch-date-time.service';
import { SelectFormGroupInfoArrayService } from 'src/app/@core/services/select-form-group-info-array.service';
import { CockpitBranchesService } from 'src/app/@core/services/cockpit-branches.service';

const DIRECTIVE_MODULES = [BootstrapLayoutModule];

@NgModule({
  declarations: [
    BookComponent,
    InfoComponent,
    CarInfoComponent,
    BranchesComponent,
    SummaryComponent,
    MainBranchesComponent,
    MainBranchesSearchComponent,
    MainBranchesCardComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ComponentsModule,
    MatStepperModule,
    MatCardModule,
    MatIconModule,
    ...DIRECTIVE_MODULES,
  ],
  providers: [
    SalesforceQueryFormService,
    SelectFormGroupBranchService,
    SelectFormGroupBranchDateTimeService,
    SelectFormGroupInfoArrayService,
    CockpitBranchesService,
  ],
})
export class BookModule {}
