import { animate, style, transition, trigger } from '@angular/animations';

export const ShrinkOut = (duration: number | string = '200ms') =>
  trigger('shrinkOut', [
    transition(
      ':leave',
      [style({ height: '*' }), animate('{{duration}}', style({ height: 0 }))],
      { params: { duration } }
    )
  ]);
