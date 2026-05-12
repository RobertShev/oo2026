import { useState } from 'react';
import type { AthleteDTO, ResultDTO } from '../types';

interface AddResultFormProps {
  selectedAthlete: AthleteDTO | null;
  totalScore: number | null;
  isLoading: boolean;
  onAddResult: (result: ResultDTO) => Promise<void>;
  onDeselect: () => void;
}

export function AddResultForm({ selectedAthlete, totalScore, isLoading, onAddResult, onDeselect }: AddResultFormProps) {
  const [discipline, setDiscipline] = useState('');
  const [resultValue, setResultValue] = useState<string>('');

  const selectedAthleteId = selectedAthlete?.id ?? null;
  const selectedAthleteName = selectedAthlete?.name;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valueNum = Number(resultValue);
    if (selectedAthleteId === null || !discipline.trim() || isNaN(valueNum) || valueNum <= 0 || isLoading) return;

    await onAddResult({
      athleteId: selectedAthleteId,
      discipline: discipline.trim(),
      resultValue: valueNum
    });
    setDiscipline('');
    setResultValue('');
  };

  const isFormValid = selectedAthleteId !== null && discipline.trim() !== '' && Number(resultValue) > 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Add Result</h2>

      {!selectedAthleteId ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No athlete selected</h3>
          <p className="text-sm text-gray-500 max-w-[200px]">
            Please select an athlete from the list or create a new one to add a result.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 flex-1">
          {selectedAthleteName && (
            <div className="bg-blue-50/50 border border-blue-100 px-4 py-3 rounded-xl mb-6 flex justify-between items-center group/badge">
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest block mb-0.5">Active Participant</span>
                <span className="text-sm font-semibold text-blue-900 leading-tight">{selectedAthleteName}</span>
                {totalScore !== null && (
                  <span className="ml-2 text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                    {totalScore} pts
                  </span>
                )}
              </div>
              <button 
                type="button"
                onClick={onDeselect}
                disabled={isLoading}
                className="text-blue-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-100/50 transition-all opacity-0 group-hover/badge:opacity-100 focus:opacity-100"
                title="Deselect athlete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Discipline
            </label>
            <input
              type="text"
              placeholder="Type discipline name (e.g. 100m)..."
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
              disabled={isLoading}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50 placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Result Value
            </label>
            <input
              type="number"
              step="0.01"
              placeholder="e.g. 10.55"
              value={resultValue}
              onChange={(e) => setResultValue(e.target.value)}
              disabled={isLoading}
              className="w-full bg-gray-50 border border-gray-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50 placeholder:text-gray-400"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:active:scale-100 flex justify-center items-center gap-2"
            >
              {isLoading && (
                <div className="w-4 h-4 rounded-full border-2 border-white/50 border-t-white animate-spin"></div>
              )}
              <span>{isLoading ? 'Processing...' : 'Save Result'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
