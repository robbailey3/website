import { FormsModule } from '@angular/forms';

import { createHostFactory, SpectatorHost } from '@ngneat/spectator';
import { Component } from '@angular/core';
import { SlideToggleComponent } from './slide-toggle.component';

@Component({ selector: 'rob-slide-toggle-host' })
class SlideToggleHostComponent {
  public value = false;
}

describe('[COMPONENT]: SlideToggleComponent', () => {
  let spectator: SpectatorHost<SlideToggleComponent, SlideToggleHostComponent>;
  let component: SlideToggleComponent;

  const hostFactory = createHostFactory({
    component: SlideToggleComponent,
    host: SlideToggleHostComponent,
    imports: [FormsModule]
  });

  beforeEach(() => {
    spectator = hostFactory<SlideToggleHostComponent>(`
      <form ngForm #form="ngForm">
        <rob-slide-toggle
        label="label" 
        helperText="helperText" 
        id="checkbox-id" 
        name="name" 
        [(ngModel)]="value"
        required></rob-slide-toggle>
      <form>`);
    component = spectator.component;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set the form label', () => {
    expect(
      spectator.query<HTMLLabelElement>('.form-label').textContent
    ).toContain('label');
  });

  it('should toggle value on click', () => {
    const initialValue = spectator.hostComponent.value;

    const sliderEl = spectator.query('#checkbox-id');

    spectator.dispatchMouseEvent(sliderEl, 'click');

    expect(spectator.hostComponent.value).toEqual(!initialValue);
  });
});
