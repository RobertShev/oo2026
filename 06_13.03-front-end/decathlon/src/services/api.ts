import axios from 'axios';
import type { AthleteDTO, ResultDTO } from '../types';

const API_BASE_URL = import.meta.env.APP_API_URL as string;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const athleteService = {
  getAll: () => api.get<AthleteDTO[]>('/athletes'),
  create: (athlete: AthleteDTO) => api.post<AthleteDTO>('/athletes', athlete),
  getTotalScore: (id: number) => api.get<number>(`/athletes/${id}/total-score`),
};

export const resultService = {
  create: (result: ResultDTO) => api.post<ResultDTO>('/results', result),
};
