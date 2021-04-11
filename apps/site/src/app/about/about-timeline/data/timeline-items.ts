import { TimelineItem } from '../interfaces/timeline-item';

const timelineItems: TimelineItem[] = [
  {
    from: new Date(2012, 8),
    title: 'University',
    summary: 'I studied Physics with Philosophy at Keele University',
    to: new Date(2015, 5)
  },
  {
    from: new Date(2016, 2),
    title: 'Oleeo',
    summary: '...',
    to: new Date(2018, 0)
  }, {
    from: new Date(2021, 1),
    title: 'Netcall',
    summary: '...',
    to: new Date()
  }
];

export { timelineItems };
