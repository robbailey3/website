import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { HomepageIntroductionComponent } from './homepage-introduction.component';

@Component({
  selector: 'rob-button',
  template: `<a [routerLink]="routerLink"><ng-content></ng-content></a>`
})
class ButtonStubComponent {
  @Input() public routerLink;

  @Input() public variant;
}

describe('HomepageIntroductionComponent', () => {
  let spectator: Spectator<HomepageIntroductionComponent>;
  let component: HomepageIntroductionComponent;

  const componentFactory = createComponentFactory({
    component: HomepageIntroductionComponent,
    declarations: [ButtonStubComponent],
    imports: [RouterTestingModule],
    schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a button which links to the about page', () => {
    const button = spectator.query('rob-button');

    const anchor = button.querySelector('a');

    expect(button).toBeDefined();
    expect(anchor.getAttribute('href')).toEqual('/about');
  });
});
