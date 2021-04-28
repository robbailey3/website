export interface Location {
  city: string;
  country: string;
  remote?: boolean;
}

export interface CVProfile{
  firstName: string;
  lastName: string;
  location: Location;
}

export interface CVExperience{
  jobTitle: string;
  company: string;
  dateFrom: Date;
  dateTo: Date;
}

export interface CV {
  profile: CVProfile;
}
