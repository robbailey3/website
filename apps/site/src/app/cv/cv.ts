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
  profile: string;
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
    ],
    profile:
      'A Software Engineer with skills in front-end and back-end development.'
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
      highlights: [
        'Built a reusable component library with Vue2 and storybook',
        'Added Azure Application Insights Telemetry to an Azure Functions App built in C# .NET'
      ],
      keywords: [
        'Vue',
        'C#',
        'Storybook',
        'Jest',
        'Azure',
        'TypeScript',
        'Serverless'
      ]
    },
    {
      jobTitle: 'Quality Control Branding Specialist',
      company: 'Oleeo',
      dateFrom: new Date(2018, 0),
      dateTo: new Date(2021, 2),
      summary:
        // eslint-disable-next-line max-len
        `In my role as a Quality Control Branding Specialist, I was fully responsible for all branding across all clients. This involved using HTML and SCSS to style our product according to the client's requirements.`,
      highlights: [
        'Built accessible React components to display data retrieved from an RSS feed and integrated with a site created using Webflow',
        'Built microsites for sales demos using Angular 9 which display jobs retrieved from a REST API',
        'Built a bespoke survey webpage using TypeScript, Webpack and SCSS for clients to submit NPS scores and feedback',
        'Reduced the time taken to brand a system by 50%, saving the company over £1000 per brand',
        'Built a command-line interface using Node.js to quickly create branding files from templates'
      ],
      keywords: ['SCSS', 'React', 'Angular', 'TypeScript', 'RSS']
    },
    {
      jobTitle: 'Quality Control Executive',
      company: 'Oleeo',
      dateFrom: new Date(2016, 2),
      dateTo: new Date(2018, 0),
      summary: 'Summary goes here',
      highlights: [
        'Performed manual functional and regression tests',
        'Produced test scripts and reports'
      ],
      keywords: ['Manual Testing', 'Regression Testing']
    }
  ],
  skills: [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'TypeScript' },
        {
          name: 'C#'
        },
        { name: 'JavaScript' },
        { name: 'PHP' },
        { name: 'Java' },
        { name: 'Go' },
        { name: 'Python' }
      ]
    },
    {
      title: 'Frameworks and Libraries',
      skills: [
        { name: 'Angular' },
        { name: 'React' },
        { name: 'Vue' },
        { name: 'NodeJS' },
        { name: 'NestJS' },
        { name: 'Express' },
        { name: 'RxJS' },
        { name: 'Akita' },
        {
          name: 'Redux'
        }
      ]
    },
    {
      title: 'Testing',
      skills: [{ name: 'Jest' }, { name: 'Cypress' }]
    },
    {
      title: 'Tools',
      skills: [
        { name: 'Docker' },
        { name: 'Git' },
        { name: 'Webpack' },
        { name: 'GitHub Actions' },
        { name: 'Nx' },
        { name: 'CircleCI' }
      ]
    },
    {
      title: 'Databases',
      skills: [
        {
          name: 'MongoDB'
        },
        {
          name: 'SQL'
        }
      ]
    },
    {
      title: 'Miscellaneous',
      skills: [
        {
          name: 'Accessibility'
        },
        {
          name: 'SEO'
        }
      ]
    }
  ]
};
