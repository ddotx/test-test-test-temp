import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SmsComponent } from './sms.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { HaveTransactionResolver } from 'src/app/@core/guards/have-transaction.resolver';


const routes: Routes = [
  {
    path: '',
    component: SmsComponent,
    resolve: { transactionInfo: HaveTransactionResolver },
  },
];

@NgModule({
  declarations: [SmsComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ComponentsModule],
  providers: [HaveTransactionResolver],
})
export class SmsModule {}
