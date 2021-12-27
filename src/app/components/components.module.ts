import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';

import { InputRelaceModule } from '../@core/directives/input-relace/input-relace.module';
import { FormModule } from '../@core/directives/form/form.module';
import { InformationPanelComponent } from './information-panel/information-panel.component';
import { CInputComponent } from './c-input/c-input.component';
import { CButtonComponent } from './c-button/c-button.component';
import { CTextHeaderComponent } from './c-text-header/c-text-header.component';
import { CTextComponent } from './c-text/c-text.component';
import { CTextLinkComponent } from './c-text-link/c-text-link.component';
import { CInputV2Component } from './c-input-v2/c-input-v2.component';
import { CSelectComponent } from './c-select/c-select.component';
import { CTextareaComponent } from './c-textarea/c-textarea.component';
import { CAutocompleteComponent } from './c-autocomplete/c-autocomplete.component';
import { CSelectProvinceComponent } from './c-select-province/c-select-province.component';
import { CMatSelectComponent } from './c-mat-select/c-mat-select.component';



const COMPONENTS = [
  InformationPanelComponent,
  CInputComponent,
  CButtonComponent,
  CTextHeaderComponent,
  CTextComponent,
  CTextLinkComponent,
  CInputV2Component,
  CSelectComponent,
  CTextareaComponent,
  CAutocompleteComponent,
  CSelectProvinceComponent,
  CMatSelectComponent,
];
const MODULES = [
  ReactiveFormsModule,
  RouterModule,
  InputRelaceModule,
  FormModule,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    ...MODULES,
    MatExpansionModule,
    NgxMaskModule.forRoot(),
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,
  ],
  exports: [...MODULES, ...COMPONENTS, NgxMaskModule],
})
export class ComponentsModule {}
