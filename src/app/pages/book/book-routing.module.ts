import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckQuotaGuard } from 'src/app/@core/guards/check-quota.guard';

import { BookComponent } from './book.component';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    canActivate: [CheckQuotaGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CheckQuotaGuard],
})
export class BookRoutingModule {}
