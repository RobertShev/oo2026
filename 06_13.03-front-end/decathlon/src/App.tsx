import { useDecathlon } from './context/DecathlonContext';
import { AthletesList } from './components/AthletesList';
import { AddResultForm } from './components/AddResultForm';

function App() {
  const { athletes, selectedAthlete, totalScore, addAthlete, addResult, selectAthlete, isLoading, error, clearError } = useDecathlon();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-blue-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-light tracking-tight text-gray-800">Decathlon Management</h1>
          <div className="flex flex-col items-center gap-3 mt-2">
            <p className="text-sm text-gray-500">Track athletes and their event results seamlessly.</p>
            <div className="bg-white px-4 py-1.5 rounded-full border border-gray-100 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-700">
                {athletes.length} {athletes.length === 1 ? 'Athlete' : 'Athletes'}
              </span>
            </div>
          </div>
        </header>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 flex justify-between items-center transition-all duration-300 shadow-sm">
            <span className="text-sm font-medium">{error}</span>
            <button
              onClick={clearError}
              className="text-red-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-100"
              aria-label="Dismiss error"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <AthletesList
            athletes={athletes}
            selectedAthlete={selectedAthlete}
            isLoading={isLoading}
            onAddAthlete={addAthlete}
            onSelectAthlete={selectAthlete}
          />
          <AddResultForm
            selectedAthlete={selectedAthlete}
            totalScore={totalScore}
            isLoading={isLoading}
            onAddResult={addResult}
            onDeselect={() => selectAthlete(null)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
