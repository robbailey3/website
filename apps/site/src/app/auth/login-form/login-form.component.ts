import { Component, Output, EventEmitter, Input } from '@angular/core';
import { LoginBody } from '../types/login-body';

@Component({
  selector: 'rob-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Input() displayErrorMessage = false;

  @Output() formSubmit: EventEmitter<LoginBody> = new EventEmitter();

  public handleFormSubmit(formValue: LoginBody) {
    this.formSubmit.emit(formValue);
  }
}
