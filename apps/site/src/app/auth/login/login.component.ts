import { Component } from '@angular/core';
import { Notification, NotificationsService } from '@website/ui-components';
import { AuthService } from '../auth.service';
import { LoginBody } from '../types/login-body';

@Component({
  selector: 'rob-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public displayErrorMessage = false;

  constructor(
    private readonly authService: AuthService,
    private notificationsService: NotificationsService
  ) {}

  public handleFormSubmit(body: LoginBody) {
    this.authService.login(body.email, body.password).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (err) => {
        this.displayErrorMessage = true;
        this.notificationsService.add(
          new Notification('Login failed', 'error', true, 5000)
        );
      }
    });
  }
}
