import { animate, style, transition, trigger } from '@angular/animations';

export const GrowIn = (duration: number | string = '200ms') =>
  trigger('growIn', [
    transition(
      ':enter',
      [style({ height: 0 }), animate('{{duration}}', style({ height: '*' }))],
      { params: { duration } }
    )
  ]);
