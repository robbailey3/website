import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faGithub,
  faLinkedin,
  faStackOverflow,
  faTwitter
} from '@fortawesome/free-brands-svg-icons';

export interface Location {
  city: string;
  country: string;
  remote?: boolean;
}

export interface CVSocialMedia {
  name: string;
  url: URL | string;
  icon: IconProp;
}

export interface CVProfile {
  firstName: string;
  lastName: string;
  location: Location;
  socialMedia: CVSocialMedia[];
}

export interface CVExperience {
  jobTitle: string;
  company: string;
  dateFrom: Date;
  dateTo: Date;
  summary: string;
  highlights: string[];
  keywords: string[];
}

export interface CVEducation {
  institution: string;
  qualification: string;
  dateFrom: Date;
  dateTo: Date;
  highlights: string[];
}

export interface CVSkill {
  name: string;
  rating: number;
}
export interface CVSkillCategories {
  title: string;
  skills: CVSkill[];
}

export interface CVModel {
  profile: CVProfile;
  experience: CVExperience[];
  education: CVEducation[];
  skills: CVSkillCategories[];
}

export const CV: CVModel = {
  profile: {
    firstName: 'Rob',
    lastName: 'Bailey',
    location: {
      city: 'Nottingham',
      country: 'UK',
      remote: true
    },
    socialMedia: [
      {
        name: 'LinkedIn',
        icon: faLinkedin,
        url: 'https://www.linkedin.com/in/robbailey3/'
      },
      {
        name: 'GitHub',
        icon: faGithub,
        url: 'https://github.com/robbailey3'
      },
      {
        name: 'StackOverflow',
        icon: faStackOverflow,
        url: 'https://stackoverflow.com/users/7959497/rob-bailey'
      },
      {
        name: 'Twitter',
        icon: faTwitter,
        url: 'https://twitter.com/rob_bailey3'
      }
    ]
  },
  education: [
    {
      institution: 'Udacity',
      qualification: 'Full-Stack Developer NanoDegree',
      highlights: [''],
      dateFrom: new Date(2020, 3),
      dateTo: new Date(2020, 3)
    },
    {
      institution: 'Udacity',
      qualification: 'Front-End Developer NanoDegree',
      highlights: [''],
      dateFrom: new Date(2018, 11),
      dateTo: new Date(2019, 1)
    },
    {
      institution: 'Keele University',
      qualification: 'BSc Physics with Philosophy',
      highlights: [''],
      dateFrom: new Date(2012, 10),
      dateTo: new Date(2015, 7)
    }
  ],
  experience: [
    {
      jobTitle: 'Software Engineer',
      company: 'Netcall',
      dateFrom: new Date(2021, 2),
      dateTo: new Date(),
      summary: 'Summary goes here',
      highlights: ['Built a reusable component library'],
      keywords: ['Vue', 'C#']
    },
    {
      jobTitle: 'Quality Control Branding Specialist',
      company: 'Oleeo',
      dateFrom: new Date(2018, 0),
      dateTo: new Date(2021, 2),
      summary: 'Summary goes here',
      highlights: ['Worked with Goldman Sachs'],
      keywords: []
    },
    {
      jobTitle: 'Quality Control Executive',
      company: 'Oleeo',
      dateFrom: new Date(2016, 2),
      dateTo: new Date(2018, 0),
      summary: 'Summary goes here',
      highlights: ['Worked with Goldman Sachs'],
      keywords: []
    }
  ],
  skills: [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'TypeScript', rating: 88 },
        {
          name: 'C#',
          rating: 55
        },
        { name: 'JavaScript', rating: 90 },
        { name: 'PHP', rating: 45 },
        { name: 'Java', rating: 30 },
        { name: 'Go', rating: 50 },
        { name: 'Python', rating: 50 }
      ]
    },
    {
      title: 'Frameworks and Libraries',
      skills: [
        { name: 'Angular', rating: 90 },
        { name: 'React', rating: 80 },
        { name: 'Vue', rating: 75 },
        { name: 'NodeJS', rating: 80 },
        { name: 'NestJS', rating: 85 },
        { name: 'Express', rating: 70 },
        { name: 'RxJS', rating: 75 },
        { name: 'Akita', rating: 62 },
        {
          name: 'Redux',
          rating: 50
        }
      ]
    },
    {
      title: 'Testing',
      skills: [
        { name: 'Jest', rating: 80 },
        { name: 'Cypress', rating: 65 }
      ]
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Docker', rating: 70 },
        { name: 'Git', rating: 80 },
        { name: 'Webpack', rating: 75 },
        { name: 'GitHub Actions', rating: 40 },
        { name: 'Nx', rating: 68 },
        { name: 'CircleCI', rating: 52 }
      ]
    },
    {
      title: 'Databases',
      skills: [
        {
          name: 'MongoDB',
          rating: 75
        },
        {
          name: 'SQL',
          rating: 45
        }
      ]
    },
    {
      title: 'Miscellaneous',
      skills: [
        {
          name: 'Accessibility',
          rating: 80
        },
        {
          name: 'SEO',
          rating: 60
        }
      ]
    }
  ]
};
