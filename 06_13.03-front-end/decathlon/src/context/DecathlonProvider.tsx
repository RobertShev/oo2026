import { useCallback, useEffect, useState } from 'react';
import type { AthleteDTO, ResultDTO } from '../types';
import { athleteService, resultService } from '../services/api';
import { DecathlonContext } from './DecathlonContext';

export function DecathlonProvider({ children }: { children: React.ReactNode }) {
  const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteDTO | null>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchAthletes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await athleteService.getAll();
      setAthletes(response.data);
    } catch (err) {
      console.error('Error fetching athletes:', err);
      setError('Failed to load athletes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addAthlete = useCallback(async (name: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await athleteService.create({ name });
      await fetchAthletes();
    } catch (err) {
      console.error('Error adding athlete:', err);
      setError('Failed to add athlete. Please check your connection.');
      setIsLoading(false);
    }
  }, [fetchAthletes]);

  const selectAthlete = useCallback(async (athlete: AthleteDTO | null) => {
    if (athlete === null || athlete.id === undefined) {
      setSelectedAthlete(null);
      setTotalScore(null);
      return;
    }
    const id = athlete.id;
    setIsLoading(true);
    setError(null);
    try {
      const response = await athleteService.getTotalScore(id);
      setTotalScore(response.data);
      setSelectedAthlete(athlete);
    } catch (err) {
      console.error('Error getting total score:', err);
      setError('Failed to retrieve total score.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addResult = useCallback(async (result: ResultDTO) => {
    setIsLoading(true);
    setError(null);
    try {
      await resultService.create(result);
      const athlete = athletes.find(a => a.id === result.athleteId);
      await selectAthlete(athlete || null);
    } catch (err) {
      console.error('Error adding result:', err);
      setError('Failed to add result. Please verify the input.');
      setIsLoading(false);
    }
  }, [selectAthlete, athletes]);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  return (
    <DecathlonContext.Provider value={{
      athletes,
      selectedAthlete,
      totalScore,
      isLoading,
      error,
      clearError,
      fetchAthletes,
      addAthlete,
      addResult,
      selectAthlete
    }}>
      {children}
    </DecathlonContext.Provider>
  );
}

