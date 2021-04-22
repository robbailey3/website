import { TimelineItem } from '../interfaces/timeline-item';

const timelineItems: TimelineItem[] = [
  {
    from: new Date(2012, 8),
    title: 'University',
    summary: 'I studied Physics with Philosophy at Keele University',
    to: new Date(2015, 5),
    highlights: ['Mathematics', 'Python']
  },
  {
    from: new Date(2016, 2),
    title: 'Oleeo',
    summary: '...',
    to: new Date(2018, 0)
  },
  {
    from: new Date(2018, 0),
    title: 'Oleeo',
    summary: '...',
    to: new Date(2021, 1)
  },
  {
    from: new Date(2021, 2),
    title: 'Netcall',
    summary: '...',
    to: new Date(),
    highlights: ['Vue', 'Storybook']
  }
];

export { timelineItems };
