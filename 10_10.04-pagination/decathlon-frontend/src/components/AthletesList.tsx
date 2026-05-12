import { useState } from 'react';
import type { AthleteDTO } from '../types';
import { useDecathlon } from '../context/DecathlonContext';

const PAGE_SIZES = [5, 10, 20, 50];

export function AthletesList() {
  const {
    athletes,
    countries,
    selectedAthlete,
    isLoading,
    page,
    pageSize,
    totalPages,
    totalElements,
    countryFilter,
    scoreSort,
    addAthlete,
    deleteAthlete,
    selectAthlete,
    setPage,
    setPageSize,
    setCountryFilter,
    cycleScoreSort,
  } = useDecathlon();

  const [newAthleteName, setNewAthleteName] = useState('');
  const [newAthleteCountry, setNewAthleteCountry] = useState('');

  const selectedAthleteId = selectedAthlete?.id ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthleteName.trim() || isLoading) return;
    await addAthlete(newAthleteName.trim(), newAthleteCountry.trim() || undefined);
    setNewAthleteName('');
    setNewAthleteCountry('');
  };

  const handleDelete = async (e: React.MouseEvent, athlete: AthleteDTO) => {
    e.stopPropagation();
    if (athlete.id === undefined || isLoading) return;
    if (!window.confirm(`Delete athlete "${athlete.name}"? This will also remove all their results.`)) return;
    await deleteAthlete(athlete.id);
  };

  const sortLabel = scoreSort === 'desc' ? 'Score ↓' : scoreSort === 'asc' ? 'Score ↑' : 'Sort by score';
  const sortIsActive = scoreSort !== null;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-800">Athletes</h2>
        {isLoading && (
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-[1fr_auto_auto] gap-2">
        <input
          type="text"
          placeholder="Athlete name"
          value={newAthleteName}
          onChange={(e) => setNewAthleteName(e.target.value)}
          disabled={isLoading}
          className="bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
        />
        <input
          type="text"
          placeholder="Country (optional)"
          value={newAthleteCountry}
          onChange={(e) => setNewAthleteCountry(e.target.value)}
          disabled={isLoading}
          className="bg-gray-50 border border-gray-200 px-3 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50 w-32"
        />
        <button
          type="submit"
          disabled={!newAthleteName.trim() || isLoading}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          Add
        </button>
      </form>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          value={countryFilter ?? ''}
          onChange={(e) => setCountryFilter(e.target.value || null)}
          disabled={isLoading}
          className="bg-gray-50 border border-gray-200 px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
          aria-label="Filter by country"
        >
          <option value="">All countries</option>
          {countries.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={cycleScoreSort}
          disabled={isLoading}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all border ${
            sortIsActive
              ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
              : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
          } disabled:opacity-50`}
          aria-label={`Sort: ${sortLabel}`}
        >
          {sortLabel}
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs text-gray-500" htmlFor="page-size-select">Per page:</label>
          <select
            id="page-size-select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            disabled={isLoading}
            className="bg-gray-50 border border-gray-200 px-2 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto max-h-[400px] pr-2 -mr-2 space-y-2">
        {athletes.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            {countryFilter ? `No athletes found in ${countryFilter}.` : 'No athletes found. Add one to start.'}
          </p>
        ) : (
          athletes.map((athlete) => (
            <div
              key={athlete.id ?? athlete.name}
              role="button"
              tabIndex={isLoading ? -1 : 0}
              aria-pressed={selectedAthleteId === athlete.id}
              onClick={() => {
                if (athlete.id !== undefined && !isLoading) {
                  selectAthlete(athlete.id === selectedAthleteId ? null : athlete);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && athlete.id !== undefined && !isLoading) {
                  e.preventDefault();
                  selectAthlete(athlete.id === selectedAthleteId ? null : athlete);
                }
              }}
              className={`w-full text-left px-4 py-3 min-h-[60px] rounded-xl border transition-all duration-200 flex justify-between items-center gap-3 group ${
                selectedAthleteId === athlete.id
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium transition-colors break-words ${selectedAthleteId === athlete.id ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                  {athlete.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500">
                  {athlete.country && <span>{athlete.country}</span>}
                  {athlete.country && athlete.totalScore !== undefined && <span aria-hidden>·</span>}
                  {athlete.totalScore !== undefined && (
                    <span className="font-medium text-gray-600">{athlete.totalScore} pts</span>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => handleDelete(e, athlete)}
                disabled={isLoading || athlete.id === undefined}
                aria-label={`Delete athlete ${athlete.name}`}
                className="text-gray-300 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 disabled:cursor-not-allowed"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>

      {totalElements > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
          <button
            type="button"
            onClick={() => setPage(page - 1)}
            disabled={isLoading || page === 0}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ← Prev
          </button>
          <span className="text-gray-600">
            Page {totalPages === 0 ? 0 : page + 1} of {totalPages} · {totalElements} total
          </span>
          <button
            type="button"
            onClick={() => setPage(page + 1)}
            disabled={isLoading || page + 1 >= totalPages}
            className="px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
