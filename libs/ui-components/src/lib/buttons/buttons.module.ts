import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  exports: [ButtonComponent]
})
export class ButtonsModule {}
