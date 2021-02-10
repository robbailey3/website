import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { SliderComponent } from './slider.component';

@Component({ selector: 'rob-slider-host' })
class SliderHostComponent {
  public value = false;
}

describe('SliderComponent', () => {
  let spectator: SpectatorHost<SliderComponent, SliderHostComponent>;
  let component: SliderComponent;

  const hostFactory = createHostFactory({
    component: SliderComponent,
    host: SliderHostComponent,
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = hostFactory(`<form ngForm #form="ngForm">
        <rob-slider
        label="label" 
        helperText="helperText" 
        id="checkbox-id" 
        name="name" 
        [(ngModel)]="value"
        required></rob-slider>
      <form>`);
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set the form label', () => {
    expect(spectator.query<HTMLLabelElement>('.form-label').textContent).toContain('label');
  });

  it('should call onChange from handleChange when a change event is fired', () => {
    const spy = jest.spyOn(component, 'onChange');

    const inputEl = spectator.query('input[type=range]');

    spectator.dispatchFakeEvent(inputEl, 'change');

    expect(spy).toHaveBeenCalled();
  });
});
