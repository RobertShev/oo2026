import axios from 'axios';
import type { AthleteDTO, ResultDTO, Page, ScoreSort } from '../types';

const API_BASE_URL = import.meta.env.VITE_APP_API_URL as string;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export interface AthletesQuery {
  page: number;
  size: number;
  country?: string | null;
  scoreSort?: ScoreSort;
}

export const athleteService = {
  // Spring Pageable expects ?page=&size=&sort=field,direction
  getPage: ({ page, size, country, scoreSort }: AthletesQuery) => {
    const params: Record<string, string | number> = { page, size };
    if (country) params.country = country;
    if (scoreSort) params.scoreSort = scoreSort;
    return api.get<Page<AthleteDTO>>('/athletes', { params });
  },
  getCountries: () => api.get<string[]>('/athletes/countries'),
  create: (athlete: AthleteDTO) => api.post<AthleteDTO[]>('/athletes', athlete),
  delete: (id: number) => api.delete<AthleteDTO[]>(`/athletes/${id}`),
  getTotalScore: (id: number) => api.get<number>(`/athletes/${id}/total-score`),
};

export const resultService = {
  create: (result: ResultDTO) => api.post<ResultDTO>('/results', result),
};
