export interface AthleteDTO {
  id?: number;
  name: string;
  country?: string;
  totalScore?: number;
}

export interface ResultDTO {
  athleteId: number;
  discipline: string;
  resultValue: number;
  points?: number;
}

export type ScoreSort = 'desc' | 'asc' | null;

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}
