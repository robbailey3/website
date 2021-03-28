import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthQuery } from '../../auth/auth.query';

@Component({
  selector: 'rob-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private readonly authQuery: AuthQuery) {
    this.subscribeToLoggedInState();
  }

  private subscribeToLoggedInState() {
    this.authQuery.isLoggedIn$.subscribe({
      next: (loggedInState: boolean) => {
        console.log(loggedInState);
        this.isLoggedIn.next(loggedInState);
      }
    });
  }
}
