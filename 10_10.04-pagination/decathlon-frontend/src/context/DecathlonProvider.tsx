import { useCallback, useEffect, useState } from 'react';
import type { AthleteDTO, ResultDTO, ScoreSort } from '../types';
import { athleteService, resultService } from '../services/api';
import { DecathlonContext } from './DecathlonContext';

export function DecathlonProvider({ children }: { children: React.ReactNode }) {
  const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteDTO | null>(null);
  const [totalScore, setTotalScore] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPageState] = useState<number>(0);
  const [pageSize, setPageSizeState] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [countryFilter, setCountryFilterState] = useState<string | null>(null);
  const [scoreSort, setScoreSort] = useState<ScoreSort>(null);

  const clearError = useCallback(() => setError(null), []);

  const fetchAthletes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await athleteService.getPage({ page, size: pageSize, country: countryFilter, scoreSort });
      setAthletes(response.data.content);
      setTotalPages(response.data.totalPages);
      setTotalElements(response.data.totalElements);
    } catch (err) {
      console.error('Error fetching athletes:', err);
      setError('Failed to load athletes. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, countryFilter, scoreSort]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await athleteService.getCountries();
      setCountries(response.data);
    } catch (err) {
      console.error('Error fetching countries:', err);
    }
  }, []);

  const addAthlete = useCallback(async (name: string, country?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await athleteService.create({ name, country });
      setPageState(0);
      await fetchAthletes();
      await fetchCountries();
    } catch (err) {
      console.error('Error adding athlete:', err);
      setError('Failed to add athlete. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchAthletes, fetchCountries]);

  const deleteAthlete = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await athleteService.delete(id);
      setSelectedAthlete(prev => (prev?.id === id ? null : prev));
      setTotalScore(prev => (selectedAthlete?.id === id ? null : prev));
      await fetchAthletes();
      await fetchCountries();
    } catch (err) {
      console.error('Error deleting athlete:', err);
      setError('Failed to delete athlete. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedAthlete, fetchAthletes, fetchCountries]);

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
      const response = await athleteService.getTotalScore(result.athleteId);
      setTotalScore(response.data);
      await fetchAthletes();
    } catch (err) {
      console.error('Error adding result:', err);
      setError('Failed to add result. Please verify the input.');
    } finally {
      setIsLoading(false);
    }
  }, [fetchAthletes]);

  const setPage = useCallback((nextPage: number) => {
    setPageState(nextPage);
  }, []);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setPageState(0);
  }, []);

  const setCountryFilter = useCallback((country: string | null) => {
    setCountryFilterState(country);
    setPageState(0);
  }, []);

  const cycleScoreSort = useCallback(() => {
    setScoreSort(prev => (prev === null ? 'desc' : prev === 'desc' ? 'asc' : null));
    setPageState(0);
  }, []);

  useEffect(() => {
    fetchAthletes();
  }, [fetchAthletes]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  // If the currently selected country disappears from the list (e.g. after
  // deleting the last athlete from that country), reset the filter so the
  // dropdown's visible value matches state and refetches kick in.
  useEffect(() => {
    if (countryFilter && !countries.includes(countryFilter)) {
      setCountryFilterState(null);
      setPageState(0);
    }
  }, [countries, countryFilter]);

  return (
    <DecathlonContext.Provider value={{
      athletes,
      countries,
      selectedAthlete,
      totalScore,
      isLoading,
      error,
      page,
      pageSize,
      totalPages,
      totalElements,
      countryFilter,
      scoreSort,
      clearError,
      setPage,
      setPageSize,
      setCountryFilter,
      cycleScoreSort,
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
