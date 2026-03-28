export interface AthleteDTO {
  id?: number;
  name: string;
}

export interface ResultDTO {
  athleteId: number;
  discipline: string;
  resultValue: number;
  points?: number;
}
