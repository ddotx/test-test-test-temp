import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';


import { ComponentsModule } from 'src/app/components/components.module';
import { StatusComponent } from './status.component';
import { FailComponent } from './fail/fail.component';

const routes: Routes = [
  {
    path: '',
    component: StatusComponent,
  },
  {
    path: 'fail',
    component: FailComponent,
  },
];

@NgModule({
  declarations: [StatusComponent, FailComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule],
})
export class StatusModule {}
