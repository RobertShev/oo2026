import { createContext, useContext } from 'react';
import type { AthleteDTO, ResultDTO, ScoreSort } from '../types';

export interface DecathlonContextValue {
  athletes: AthleteDTO[];
  countries: string[];
  selectedAthlete: AthleteDTO | null;
  totalScore: number | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  countryFilter: string | null;
  scoreSort: ScoreSort;
  clearError: () => void;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setCountryFilter: (country: string | null) => void;
  cycleScoreSort: () => void;
  fetchAthletes: () => Promise<void>;
  addAthlete: (name: string, country?: string) => Promise<void>;
  deleteAthlete: (id: number) => Promise<void>;
  addResult: (result: ResultDTO) => Promise<void>;
  selectAthlete: (athlete: AthleteDTO | null) => Promise<void>;
}

export const DecathlonContext = createContext<DecathlonContextValue | null>(null);

export function useDecathlon(): DecathlonContextValue {
  const ctx = useContext(DecathlonContext);
  if (!ctx) throw new Error('useDecathlon must be used within DecathlonProvider');
  return ctx;
}
