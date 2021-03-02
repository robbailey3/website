import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { WINDOW } from '@ng-toolkit/universal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'rob-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public isMobile = false;

  public $windowSize: Subject<number> = new Subject();

  public state: 'open' | 'closed' = 'closed';

  public faBars = faBars;

  constructor(@Inject(WINDOW) public window: Window, public router: Router) {}

  public ngOnInit() {
    this.subscribeToWindowSize();
    this.handleWindowResize();
    this.router.events.subscribe({
      next: ($event) => {
        if ($event instanceof NavigationEnd) {
          this.state = 'closed';
        }
      }
    });
  }

  @HostListener('window:resize')
  public handleWindowResize() {
    this.$windowSize.next(this.window.innerWidth);
  }

  public subscribeToWindowSize() {
    this.$windowSize.pipe(debounceTime(200), distinctUntilChanged()).subscribe({
      next: (size: number) => {
        this.isMobile = size < 768;
      }
    });
  }

  public handleNavButtonClick() {
    this.state = this.state === 'open' ? 'closed' : 'open';
  }
}
