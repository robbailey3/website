export interface Location {
  city: string;
  country: string;
  remote?: boolean;
}

export interface CVProfile {
  firstName: string;
  lastName: string;
  location: Location;
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
    }
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
      summary: '',
      highlights: ['Built a reusable component library'],
      keywords: ['Vue']
    }
  ],
  skills: [
    {
      title: 'Programming',
      skills: [
        { name: 'TypeScript', rating: 88 },
        {
          name: 'C#',
          rating: 35
        }
      ]
    }
  ]
};
