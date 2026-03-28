import { useEffect, useState } from 'react';
import { AthleteDTO } from './types';
import { athleteService, resultService } from './services/api';

function App() {
  const [athletes, setAthletes] = useState<AthleteDTO[]>([]);
  const [newAthleteName, setNewAthleteName] = useState('');
  const [selectedAthleteId, setSelectedAthleteId] = useState<number | null>(null);
  const [discipline, setDiscipline] = useState('');
  const [resultValue, setResultValue] = useState<number>(0);
  const [totalScore, setTotalScore] = useState<number | null>(null);

  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const response = await athleteService.getAll();
        setAthletes(response.data);
      } catch (error) {
        console.error('Error fetching athletes:', error);
      }
    };
    loadAthletes();
  }, []);

  const fetchAthletes = async () => {
    try {
      const response = await athleteService.getAll();
      setAthletes(response.data);
    } catch (error) {
      console.error('Error fetching athletes:', error);
    }
  };

  const handleAddAthlete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAthleteName) return;
    try {
      await athleteService.create({ name: newAthleteName });
      setNewAthleteName('');
      fetchAthletes();
    } catch (error) {
      console.error('Error adding athlete:', error);
    }
  };

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAthleteId === null || !discipline || resultValue <= 0) return;
    try {
      await resultService.create({
        athleteId: selectedAthleteId,
        discipline,
        resultValue,
      });
      setDiscipline('');
      setResultValue(0);
      handleGetTotalScore(selectedAthleteId);
    } catch (error) {
      console.error('Error adding result:', error);
    }
  };

  const handleGetTotalScore = async (id: number) => {
    try {
      const response = await athleteService.getTotalScore(id);
      setTotalScore(response.data);
      setSelectedAthleteId(id);
    } catch (error) {
      console.error('Error getting total score:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Decathlon Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Athletes List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Athletes</h2>
          <form onSubmit={handleAddAthlete} className="mb-6 flex gap-2">
            <input
              type="text"
              placeholder="Athlete Name"
              value={newAthleteName}
              onChange={(e) => setNewAthleteName(e.target.value)}
              className="flex-1 border p-2 rounded"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add
            </button>
          </form>

          <ul className="space-y-2">
            {athletes.map((athlete) => (
              <li
                key={athlete.id}
                className={`p-3 border rounded cursor-pointer flex justify-between items-center ${
                  selectedAthleteId === athlete.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  if (athlete.id !== undefined) {
                    handleGetTotalScore(athlete.id);
                  }
                }}
              >
                <span>{athlete.name}</span>
                {selectedAthleteId === athlete.id && totalScore !== null && (
                  <span className="font-bold text-blue-600">Total Score: {totalScore}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Add Result Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Add Result</h2>
          <form onSubmit={handleAddResult} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Athlete</label>
              <select
                value={selectedAthleteId || ''}
                onChange={(e) => setSelectedAthleteId(Number(e.target.value))}
                className="mt-1 block w-full border p-2 rounded"
              >
                <option value="">Choose an athlete</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id} value={athlete.id}>
                    {athlete.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discipline</label>
              <input
                type="text"
                placeholder="e.g. 100m, Long Jump"
                value={discipline}
                onChange={(e) => setDiscipline(e.target.value)}
                className="mt-1 block w-full border p-2 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Result Value</label>
              <input
                type="number"
                step="0.01"
                value={resultValue}
                onChange={(e) => setResultValue(Number(e.target.value))}
                className="mt-1 block w-full border p-2 rounded"
              />
            </div>
            <button
              type="submit"
              disabled={selectedAthleteId === null}
              className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300"
            >
              Add Result
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
