import { TimelineItem } from '../interfaces/timeline-item';

const timelineItems: TimelineItem[] = [
  {
    from: new Date(2012, 8),
    title: 'Studied at University',
    summary: 'I studied Physics with Philosophy at Keele University',
    to: new Date(2015, 5),
    highlights: ['Mathematics', 'Python']
  },
  {
    from: new Date(2016, 2),
    title: 'Became a Software Tester at Oleeo',
    summary: '...',
    to: new Date(2018, 0)
  },
  {
    from: new Date(2017, 0),
    title: 'First started learning to make websites with Code',
    summary: '...',
    to: new Date(2018, 0)
  },
  {
    from: new Date(2018, 0),
    title: 'Moved into "Branding" at Oleeo',
    summary: '...',
    to: new Date(2021, 1)
  },
  {
    from: new Date(2020, 5),
    title: 'Completed the Full-Stack Developer Udacity NanoDegree',
    summary: '...',
    to: new Date(2020, 5)
  },
  {
    from: new Date(2021, 2),
    title: 'Started as a Software Engineer at Netcall',
    summary: '...',
    to: new Date(),
    highlights: ['Vue', 'Storybook']
  }
];

export { timelineItems };
