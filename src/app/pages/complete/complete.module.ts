import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompleteComponent } from './complete.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';


const routes: Routes = [
  {
    path: '',
    component: CompleteComponent,
  },
];

@NgModule({
  declarations: [CompleteComponent],
  imports: [CommonModule, RouterModule.forChild(routes),ComponentsModule],
})
export class CompleteModule {}
