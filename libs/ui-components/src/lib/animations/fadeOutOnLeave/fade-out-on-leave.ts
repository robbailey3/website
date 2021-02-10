import { animate, style, transition, trigger } from '@angular/animations';

export const FadeOutOnLeave = (duration: number | string = '200ms') =>
  trigger('fadeOutOnLeave', [
    transition(
      ':leave',
      [style({ opacity: 1 }), animate('{{duration}}', style({ opacity: 0 }))],
      { params: { duration } }
    )
  ]);
