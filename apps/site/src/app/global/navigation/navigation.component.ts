import { Component, HostListener, Inject, OnInit } from '@angular/core';
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

  public state: 'open' | 'closed' = 'open';

  public faBars = faBars;

  constructor(@Inject(WINDOW) public window: Window) {}

  public ngOnInit() {
    this.handleWindowResize();
    this.subscribeToWindowSize();
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
}
