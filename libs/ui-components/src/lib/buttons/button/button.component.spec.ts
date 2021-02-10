import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let spectator: Spectator<ButtonComponent>;
  let component: ButtonComponent;
  const componentFactory = createComponentFactory({
    component: ButtonComponent,
    imports: [FontAwesomeModule]
  });

  beforeEach(() => {
    spectator = componentFactory();
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit when clicked', () => {
    const spy = jest.spyOn(component.buttonClick, 'emit');
    const button = spectator.query('button');
    spectator.dispatchMouseEvent(button, 'click');

    expect(spy).toHaveBeenCalled();
  });
});
