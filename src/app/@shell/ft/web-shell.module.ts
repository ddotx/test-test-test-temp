import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ROUTER_UTILS } from 'src/app/@core/utils/router.utils';


const APP_ROUTES: Routes = [
  {
    path:ROUTER_UTILS.config.appointment.root,
    loadChildren: async () =>(await import('../../pages/book/book.module')).BookModule
  },
  {
    path: ROUTER_UTILS.config.complete.root,
    loadChildren: async () =>
      (await import('../../pages/complete/complete.module')).CompleteModule,
  },
  {
    path: ROUTER_UTILS.config.redeem.root,
    loadChildren: async () => (await import('../../pages/sms/sms.module')).SmsModule,
  },
  {
    path: ROUTER_UTILS.config.status.root,
    loadChildren: async () =>
      (await import('../../pages/status/status.module')).StatusModule,
  },
  {
    path: ROUTER_UTILS.config.end.root,
    loadChildren: async () =>
      (await import('../../pages/end/end.module')).EndModule,
  },
  {
    path: '',
    redirectTo: ROUTER_UTILS.config.appointment.root,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(APP_ROUTES)],
  exports: [RouterModule],
})
export class WebShellModule {}
