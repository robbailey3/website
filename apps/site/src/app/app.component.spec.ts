import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { createRoutingFactory, SpectatorRouting } from '@ngneat/spectator';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { PageMetaService } from './shared/services/page-meta/page-meta.service';

describe('AppComponent', () => {
  let spectator: SpectatorRouting<AppComponent>;
  let component: AppComponent;
  let pageMetaService: PageMetaService;
  const routeData = { title: 'foo', description: 'bar' };
  const createComponent = createRoutingFactory({
    component: AppComponent,
    data: routeData,
    imports: [RouterTestingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  });

  beforeEach(async () => {
    spectator = createComponent();
    component = spectator.component;
    pageMetaService = spectator.inject(PageMetaService);
    await spectator.fixture.whenStable();
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  it('should call pageMetaService->setTitle when a NavigationEnd event is fired', () => {
    const spy = jest.spyOn(pageMetaService, 'setTitle');

    (spectator.inject(Router).events as Subject<NavigationEnd>).next(
      new NavigationEnd(1, '/', '/')
    );

    expect(spy).toHaveBeenCalledWith(routeData.title);
  });

  it('should call pageMetaService->updateMetaTag when a NavigationEnd event is fired', () => {
    const spy = jest.spyOn(pageMetaService, 'updateMetaTag');

    (spectator.inject(Router).events as Subject<NavigationEnd>).next(
      new NavigationEnd(1, '/', '/')
    );

    expect(spy).toHaveBeenCalledWith({
      name: 'description',
      content: routeData.description
    });
  });
});
