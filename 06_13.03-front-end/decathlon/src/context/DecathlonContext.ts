import { createContext, useContext } from 'react';
import type { AthleteDTO, ResultDTO } from '../types';

export interface DecathlonContextValue {
  athletes: AthleteDTO[];
  selectedAthlete: AthleteDTO | null;
  totalScore: number | null;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
  fetchAthletes: () => Promise<void>;
  addAthlete: (name: string) => Promise<void>;
  addResult: (result: ResultDTO) => Promise<void>;
  selectAthlete: (athlete: AthleteDTO | null) => Promise<void>;
}

export const DecathlonContext = createContext<DecathlonContextValue | null>(null);

export function useDecathlon(): DecathlonContextValue {
  const ctx = useContext(DecathlonContext);
  if (!ctx) throw new Error('useDecathlon must be used within DecathlonProvider');
  return ctx;
}
