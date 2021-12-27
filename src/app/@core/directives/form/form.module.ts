import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyCharacterDirective } from './only-character.directive';
import { OnlyCharacterNumberDirective } from './only-character-number.directive';

@NgModule({
  declarations: [OnlyCharacterDirective, OnlyCharacterNumberDirective],
  imports: [CommonModule],
  exports: [OnlyCharacterDirective, OnlyCharacterNumberDirective],
})
export class FormModule {}
