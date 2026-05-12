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
      const response = await athleteService.getAll();
      setAthletes(response.data);
    } catch (err) {
      console.error('Error adding athlete:', err);
      setError('Failed to add athlete. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteAthlete = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await athleteService.delete(id);
      setAthletes(prev => prev.filter(a => a.id !== id));
      setSelectedAthlete(prev => (prev?.id === id ? null : prev));
      setTotalScore(prev => (selectedAthlete?.id === id ? null : prev));
    } catch (err) {
      console.error('Error deleting athlete:', err);
      setError('Failed to delete athlete. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedAthlete]);

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
      if (athlete) {
        const response = await athleteService.getTotalScore(athlete.id!);
        setTotalScore(response.data);
        setSelectedAthlete(athlete);
      }
    } catch (err) {
      console.error('Error adding result:', err);
      setError('Failed to add result. Please verify the input.');
    } finally {
      setIsLoading(false);
    }
  }, [athletes]);

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
      deleteAthlete,
      addResult,
      selectAthlete
    }}>
      {children}
    </DecathlonContext.Provider>
  );
}
