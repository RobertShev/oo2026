import { useState } from 'react';
import type { AthleteDTO } from '../types';

interface AthletesListProps {
  athletes: AthleteDTO[];
  selectedAthlete: AthleteDTO | null;
  isLoading: boolean;
  onAddAthlete: (name: string) => Promise<void>;
  onSelectAthlete: (athlete: AthleteDTO | null) => Promise<void>;
}

export function AthletesList({ athletes, selectedAthlete, isLoading, onAddAthlete, onSelectAthlete }: AthletesListProps) {
  const [newAthleteName, setNewAthleteName] = useState('');

  const selectedAthleteId = selectedAthlete?.id ?? null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthleteName.trim() || isLoading) return;
    await onAddAthlete(newAthleteName.trim());
    setNewAthleteName('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium text-gray-800">Athletes</h2>
        {isLoading && (
          <div className="w-4 h-4 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="New athlete name..."
          value={newAthleteName}
          onChange={(e) => setNewAthleteName(e.target.value)}
          disabled={isLoading}
          className="flex-1 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!newAthleteName.trim() || isLoading}
          className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:active:scale-100"
        >
          Add
        </button>
      </form>

      <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 -mr-2 space-y-2">
        {athletes.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">No athletes found. Add one to start.</p>
        ) : (
          athletes.map((athlete) => (
            <button
              key={athlete.id ?? athlete.name}
              type="button"
              disabled={isLoading}
              onClick={() => {
                if (athlete.id !== undefined) {
                  onSelectAthlete(athlete.id === selectedAthleteId ? null : athlete);
                }
              }}
              className={`w-full text-left px-4 py-3 min-h-[60px] rounded-xl border transition-all duration-200 flex justify-between items-center gap-3 group ${
                selectedAthleteId === athlete.id 
                  ? 'bg-blue-50 border-blue-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-sm'
              } ${isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <span className={`flex-1 text-sm font-medium transition-colors break-words ${selectedAthleteId === athlete.id ? 'text-blue-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                {athlete.name}
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
