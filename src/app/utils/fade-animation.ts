import {
  trigger,
  animate,
  transition,
  style,
  query,
  group,
} from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition('* => home', [
    query(':enter', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      }),
    ], { optional: true }),
    query(':leave', [
      style({ opacity: 1, position: 'absolute', top: 0, left: 0, width: '100%' }),
    ], { optional: true }),
    group([
      query(':enter', [
        animate('1600ms 800ms ease-out', style({ opacity: 1 }))
      ], { optional: true }),
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, left: '-24px' }))
      ], { optional: true }),
    ])
  ]),
  transition('home => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      })
    ], { optional: true }),
    query(':enter', [
      style({ left: '-24px', opacity: 0 })
    ], { optional: true }),
    group([
      query(':leave', [
        animate('600ms ease-out', style({ opacity: 0, scale: '0.9' }))
      ], { optional: true }),
      query(':enter', [
        animate('600ms 300ms ease-out', style({ left: '0', opacity: 1 }))
      ], { optional: true }),
    ]),
  ]),
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
      }),
    ], { optional: true}),
    query(':enter', [
      style({ left: '-24px', opacity: 0 })
    ], { optional: true}),
    group([
      query(':leave', [
        animate('200ms ease-out', style({ left: '24px', opacity: 0 }))
      ], { optional: true}),
      query(':enter', [
        animate('300ms 300ms ease-out', style({ left: '0', opacity: 1 }))
      ], { optional: true}),
    ]),
  ])
]);