import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  public isLoading = false;

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router
  ) {}

  public handleFormSubmit(body: LoginBody) {
    this.isLoading = true;
    this.authService.login(body.email, body.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigateByUrl('/admin');
      },
      error: () => {
        this.displayErrorMessage = true;
        this.isLoading = false;
        this.notificationsService.add(
          new Notification('Login failed', 'error', true, 5000)
        );
      }
    });
  }
}
