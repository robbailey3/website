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
  summary?: string;
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
      summary:
        // eslint-disable-next-line max-len
        'The goal of the Full Stack Web Developer Nanodegree program is to equip learners with the unique skills they need to build database-backed APIs and web applications. A graduate of this program will be able to design and build databases for software applications, create and deploy database-backed web APIs, and secure and manage user authentication and access control for an application backend. Students will also learn how to deploy a Flask-based web application to the cloud using Docker and Kubernetes.',
      highlights: [
        'Built an API using Python and Flask to perform CRUD operations on a PostgreSQL database',
        'Used Auth0 for Authentication to secure API endpoints',
        'Built a quiz application including an API using Python and Flask'
      ],
      dateFrom: new Date(2020, 3),
      dateTo: new Date(2020, 3)
    },
    {
      institution: 'Udacity',
      qualification: 'Front-End Developer NanoDegree',
      summary:
        // eslint-disable-next-line max-len
        'The goal of the Front End Web Developer Nanodegree program is to equip learners with the unique skills they need to build and develop a variety of websites and applications. Graduates of this Nanodegree program will be able to construct responsive websites using CSS, Flexbox and CSS Grid, develop interactive websites and UI (User Interface) applications using JavaScript and HTML, and connect a web application to backend server data using JavaScript. Students will also build competency automating application build and deployment using Webpack and improving offline performance of websites using Service Worker.',
      highlights: [],
      dateFrom: new Date(2018, 11),
      dateTo: new Date(2019, 1)
    },
    {
      institution: 'Keele University',
      qualification: 'BSc Physics with Philosophy',
      summary:
        // eslint-disable-next-line max-len
        'Study Physics at Keele and you’ll learn to apply mathematics and computing to formulate and solve a wide range of physical problems. Physics is a fundamental, curiosity-driven science that has applications in many other areas of science and a vast range of industries, from telecommunications and power generation through to medicine.',
      highlights: [],
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
