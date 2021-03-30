import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { PageMetaService } from './shared/services/page-meta/page-meta.service';
import { RouteMetaData } from './shared/types/RouteMetaData';

@Component({
  selector: 'rob-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private lastPageTitle: string;

  private pageBlurTitle = 'Come back! 😭 Rob misses you';

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly pageMeta: PageMetaService
  ) {}

  public ngOnInit() {
    this.setupRouteListener();
  }

  private setupRouteListener(): void {
    this.router.events
      .pipe(
        filter(($event) => $event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            // eslint-disable-next-line no-param-reassign
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data)
      )
      .subscribe({
        next: (data: RouteMetaData) => {
          if (!data.title) {
            // Throw some errors if this isn't defined... it'll make me add them
            throw new Error(
              `Title is not defined for route ${this.router.url}`
            );
          }
          if (!data.description) {
            throw new Error(
              `Description is not defined for route ${this.router.url}`
            );
          }
          this.pageMeta
            .setTitle(data.title)
            .updateMetaTag({ name: 'description', content: data.description });

          this.lastPageTitle = data.title;
        }
      });
  }

  @HostListener('window:blur')
  public handleWindowBlur() {
    this.lastPageTitle = this.pageMeta.getTitle();
    this.pageMeta.setTitle(this.pageBlurTitle);
  }

  @HostListener('window:focus')
  public handleWindowFocus() {
    this.pageMeta.setTitle(this.lastPageTitle);
  }
}
