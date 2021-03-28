import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiComponentsModule } from '@website/ui-components';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AuthService } from './auth.service';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, AuthRoutingModule, UiComponentsModule, FormsModule],
  providers: [AuthService]
})
export class AuthModule {}
