export enum WebinarState {
  Past = 'past',
  Upcoming = 'upcoming',
}

export interface Webinar {
  id: string;
  date: Date;
  title: string;
  speaker: string;
  coverImage?: string;
  detailsUrl?: string;
}
