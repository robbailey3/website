import { animate, style, transition, trigger } from '@angular/animations';

export const FadeInOnEnter = (duration: number | string = '200ms') =>
  trigger('fadeInOnEnter', [
    transition(
      ':enter',
      [style({ opacity: 0 }), animate('{{duration}}', style({ opacity: 1 }))],
      { params: { duration } }
    )
  ]);
