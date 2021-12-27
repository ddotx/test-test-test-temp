import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnDirective } from './column.directive';
import { MarginDirective } from './margin.directive';
import { PaddingDirective } from './padding.directive';
import { RowDirective } from './row.directive';

const DIRECTIVES = [
  ColumnDirective,
  MarginDirective,
  PaddingDirective,
  RowDirective,
];

@NgModule({
  declarations: [...DIRECTIVES],
  imports: [CommonModule],
  exports: [...DIRECTIVES],
})
export class BootstrapLayoutModule {}
