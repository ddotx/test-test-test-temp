import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EndComponent } from './end.component';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';


const routes: Routes = [
  {
    path: '',
    component: EndComponent,
  },
];

@NgModule({
  declarations: [EndComponent],
  imports: [CommonModule,RouterModule.forChild(routes),ComponentsModule],
})
export class EndModule {}
