'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Zap, User, UserCheck, Check, X, Plus, Trash2, Edit3, Save, Download, Upload, List, Settings, Loader2 } from 'lucide-react';

interface DareRecord {
  dare: string;
  status: 'Done' | 'Not Done';
  player: string;
}

interface CompletedDares {
  completed: string[];
  notDone: string[];
}

interface CustomDare {
  id: string;
  text: string;
  completed: boolean;
  isEditing: boolean;
}

export default function DareX() {
  const [dares, setDares] = useState<string[]>([]);
  const [customDares, setCustomDares] = useState<CustomDare[]>([]);
  const [currentDare, setCurrentDare] = useState('Press the button to get a dare!');
  const [selectedPlayer, setSelectedPlayer] = useState<'player1' | 'player2'>('player1');
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');
  const [showModal, setShowModal] = useState(true);
  const [records, setRecords] = useState<DareRecord[]>([]);
  const [completedDares, setCompletedDares] = useState<{
    player1: CompletedDares;
    player2: CompletedDares;
  }>({
    player1: { completed: [], notDone: [] },
    player2: { completed: [], notDone: [] }
  });
  const [useCustomDares, setUseCustomDares] = useState(false);
  const [showCustomDaresModal, setShowCustomDaresModal] = useState(false);
  const [newCustomDare, setNewCustomDare] = useState('');

  // Load dares from JSON file
  useEffect(() => {
    const loadDares = async () => {
      try {
        const response = await fetch('/assets/games/Dare-X/dares.json');
        const daresData = await response.json();
        setDares(daresData);
      } catch (error) {
        console.error('Error loading dares:', error);
      }
    };
    loadDares();
  }, []);

  // Load custom dares from localStorage
  useEffect(() => {
    const savedCustomDares = localStorage.getItem('customDares');
    if (savedCustomDares) {
      setCustomDares(JSON.parse(savedCustomDares));
    }
  }, []);

  // Save custom dares to localStorage
  useEffect(() => {
    localStorage.setItem('customDares', JSON.stringify(customDares));
  }, [customDares]);

  const getPlayerScore = (player: 'player1' | 'player2') => {
    return completedDares[player].completed.length;
  };

  const allDaresCompleted = (player: 'player1' | 'player2') => {
    const currentDares = useCustomDares ? customDares.map(d => d.text) : dares;
    return currentDares.every(
      (dare) =>
        completedDares[player].completed.includes(dare) ||
        completedDares[player].notDone.includes(dare)
    );
  };

  const bothPlayersCompleted = () => {
    return allDaresCompleted('player1') && allDaresCompleted('player2');
  };

  const getRandomDare = (player: 'player1' | 'player2') => {
    const playerName = player === 'player1' ? player1Name : player2Name;
    const currentDares = useCustomDares ? customDares.map(d => d.text) : dares;
    const availableDares = currentDares.filter(
      (dare) =>
        !completedDares[player].completed.includes(dare) &&
        !completedDares[player].notDone.includes(dare)
    );

    if (availableDares.length === 0) {
      if (bothPlayersCompleted()) {
        resetDare();
        return 'All dares have been completed! The list has been reset.';
      }
      return `All dares have been completed for ${playerName}! Wait for the other player.`;
    }

    const randomIndex = Math.floor(Math.random() * availableDares.length);
    return availableDares[randomIndex];
  };

  const resetDare = () => {
    setCompletedDares({
      player1: { completed: [], notDone: [] },
      player2: { completed: [], notDone: [] }
    });
    setRecords([]);
  };

  const addRecord = (dare: string, player: 'player1' | 'player2', status: 'Done' | 'Not Done') => {
    const newRecord: DareRecord = {
      dare,
      status,
      player: player === 'player1' ? player1Name : player2Name
    };

    setRecords(prev => [...prev, newRecord]);
    
    setCompletedDares(prev => ({
      ...prev,
      [player]: {
        ...prev[player],
        [status === 'Done' ? 'completed' : 'notDone']: [...prev[player][status === 'Done' ? 'completed' : 'notDone'], dare]
      }
    }));

    // Auto-switch player and generate new dare
    const nextPlayer = player === 'player1' ? 'player2' : 'player1';
    setSelectedPlayer(nextPlayer);
    
    // Generate new dare for the next player
    setTimeout(() => {
      const newDare = getRandomDare(nextPlayer);
      setCurrentDare(newDare);
    }, 500);
  };

  const handleRandomize = () => {
    if (useCustomDares && customDares.length === 0) {
      alert('No custom dares available. Add some custom dares first!');
      return;
    }
    if (!useCustomDares && dares.length === 0) {
      alert('Dares are still loading. Please wait.');
      return;
    }
    const randomDare = getRandomDare(selectedPlayer);
    setCurrentDare(randomDare);
  };

  const handleDone = () => {
    if (currentDare !== 'Press the button to get a dare!' && 
        !currentDare.includes('All dares have been completed') &&
        currentDare !== 'Generating new dare...') {
      addRecord(currentDare, selectedPlayer, 'Done');
      setCurrentDare('Generating new dare...');
    }
  };

  const handleNotDone = () => {
    if (currentDare !== 'Press the button to get a dare!' && 
        !currentDare.includes('All dares have been completed') &&
        currentDare !== 'Generating new dare...') {
      addRecord(currentDare, selectedPlayer, 'Not Done');
      setCurrentDare('Generating new dare...');
    }
  };

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      setShowModal(false);
    } else {
      alert('Please enter both player names.');
    }
  };

  // Custom dares functions
  const addCustomDare = () => {
    if (newCustomDare.trim()) {
      const dare: CustomDare = {
        id: Date.now().toString(),
        text: newCustomDare.trim(),
        completed: false,
        isEditing: false
      };
      setCustomDares(prev => [...prev, dare]);
      setNewCustomDare('');
    }
  };

  const deleteCustomDare = (id: string) => {
    setCustomDares(prev => prev.filter(dare => dare.id !== id));
  };

  const startEditingCustomDare = (id: string) => {
    setCustomDares(prev => prev.map(dare => 
      dare.id === id ? { ...dare, isEditing: true } : dare
    ));
  };

  const saveCustomDareEdit = (id: string, newText: string) => {
    if (newText.trim()) {
      setCustomDares(prev => prev.map(dare => 
        dare.id === id ? { ...dare, text: newText.trim(), isEditing: false } : dare
      ));
    }
  };

  const cancelCustomDareEdit = (id: string) => {
    setCustomDares(prev => prev.map(dare => 
      dare.id === id ? { ...dare, isEditing: false } : dare
    ));
  };

  const exportCustomDares = () => {
    const data = customDares.map(dare => ({ text: dare.text }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-dares.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importCustomDares = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          const newDares = data.map((item: { text: string }, index: number) => ({
            id: Date.now().toString() + index,
            text: item.text,
            completed: false,
            isEditing: false
          }));
          setCustomDares(prev => [...prev, ...newDares]);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          alert('Invalid file format. Please upload a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full mx-4">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Dare X Setup</h2>
          
          {/* Dare Type Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-4 text-center">Choose Dare Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setUseCustomDares(false)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  !useCustomDares
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <List className="h-8 w-8 mx-auto mb-2" />
                <div className="text-center">
                  <div className="font-semibold">Built-in Dares</div>
                  <div className="text-sm opacity-75">285+ Pre-made dares</div>
                </div>
              </button>
              <button
                onClick={() => setUseCustomDares(true)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  useCustomDares
                    ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                    : 'border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500'
                }`}
              >
                <Settings className="h-8 w-8 mx-auto mb-2" />
                <div className="text-center">
                  <div className="font-semibold">Custom Dares</div>
                  <div className="text-sm opacity-75">Your own dares</div>
                </div>
              </button>
            </div>
          </div>

          {/* Player Names */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Player 1 Name:</label>
              <input
                type="text"
                value={player1Name}
                onChange={(e) => setPlayer1Name(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Player 1 name"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Player 2 Name:</label>
              <input
                type="text"
                value={player2Name}
                onChange={(e) => setPlayer2Name(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                placeholder="Enter Player 2 name"
              />
            </div>
            <button
              onClick={handleStartGame}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Custom Dares Management Modal
  if (showCustomDaresModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Custom Dares Management</h2>
            <button
              onClick={() => setShowCustomDaresModal(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Add New Custom Dare */}
          <div className="mb-6">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCustomDare}
                onChange={(e) => setNewCustomDare(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addCustomDare()}
                placeholder="Add a custom dare..."
                className="flex-1 p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={addCustomDare}
                className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Import/Export */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={exportCustomDares}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200"
            >
              <Download className="h-4 w-4" />
              <span>Export Dares</span>
            </button>
            <label className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-200 cursor-pointer">
              <Upload className="h-4 w-4" />
              <span>Import Dares</span>
              <input
                type="file"
                accept=".json"
                onChange={importCustomDares}
                className="hidden"
              />
            </label>
          </div>

          {/* Custom Dares List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {customDares.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No custom dares yet. Add some above!</p>
            ) : (
              customDares.map((dare) => (
                <div key={dare.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                  {dare.isEditing ? (
                    <div className="flex-1 flex space-x-2">
                      <input
                        type="text"
                        defaultValue={dare.text}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            saveCustomDareEdit(dare.id, e.currentTarget.value);
                          }
                        }}
                        className="flex-1 p-2 bg-gray-600 text-white rounded border border-gray-500 focus:border-blue-500 focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => saveCustomDareEdit(dare.id, (document.querySelector(`input[data-id="${dare.id}"]`) as HTMLInputElement)?.value || dare.text)}
                        className="p-2 text-green-500 hover:bg-green-500 hover:text-white rounded"
                      >
                        <Save className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => cancelCustomDareEdit(dare.id)}
                        className="p-2 text-gray-400 hover:bg-gray-600 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="flex-1 text-white">{dare.text}</span>
                      <button
                        onClick={() => startEditingCustomDare(dare.id)}
                        className="p-2 text-blue-400 hover:bg-blue-500 hover:text-white rounded"
                      >
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteCustomDare(dare.id)}
                        className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setShowCustomDaresModal(false)}
              className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Game Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
        {/* Header with Score and Dare Type */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Dare X</h2>
            <p className="text-gray-400 text-sm">Score: {player1Name} {getPlayerScore('player1')} | {player2Name} {getPlayerScore('player2')}</p>
          </div>
          <div className="text-right">
            <div className="inline-flex items-center space-x-2 px-2 py-1 bg-gray-700 rounded-lg">
              {useCustomDares ? (
                <>
                  <Settings className="h-3 w-3 text-blue-400 cursor-pointer" onClick={() => setShowCustomDaresModal(true)} />
                  <span className="text-white text-sm font-medium">Manage Dares</span>
                </>
              ) : (
                <>
                  <List className="h-3 w-3 text-green-400 cursor-pointer" />
                  <span className="text-white text-sm font-medium">Built-in Dares</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Player Selection */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2">Current Player</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedPlayer('player1')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex-1 text-sm ${
                selectedPlayer === 'player1'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <User className="h-3 w-3" />
              <span>{player1Name}</span>
            </button>
            <button
              onClick={() => setSelectedPlayer('player2')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 flex-1 text-sm ${
                selectedPlayer === 'player2'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <UserCheck className="h-3 w-3" />
              <span>{player2Name}</span>
            </button>
          </div>
        </div>

        {/* Dare Display */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-white mb-2">Current Dare</h3>
          <div className="bg-gray-700 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
            {currentDare === 'Generating new dare...' ? (
              <div className="flex items-center space-x-3">
                <Loader2 className="h-6 w-6 text-blue-400 animate-spin" />
                <p className="text-base text-white font-medium">Generating new dare...</p>
              </div>
            ) : (
              <p className="text-base text-white font-medium text-center leading-relaxed">{currentDare}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <div className="flex space-x-2">
            <button
              onClick={handleRandomize}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex-1 text-sm"
            >
              <Zap className="h-4 w-4" />
              <span>Get Dare</span>
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleDone}
              className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex-1 text-sm"
            >
              <Check className="h-4 w-4" />
              <span>Done</span>
            </button>
            <button
              onClick={handleNotDone}
              className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex-1 text-sm"
            >
              <X className="h-4 w-4" />
              <span>Not Done</span>
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <div className="mt-6 pt-4 border-t border-gray-700">
          <button
            onClick={resetDare}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 w-full justify-center text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Reset Game</span>
          </button>
        </div>
      </div>

      {/* Records Section */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-white">Dare Records</h3>
          <span className="text-gray-400 text-xs">{records.length} records</span>
        </div>
        {records.length > 0 ? (
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto max-h-80">
              <table className="w-full">
                <thead className="bg-gray-600 sticky top-0">
                  <tr>
                    <th className="px-3 py-2 text-left text-white font-medium text-sm">Dare</th>
                    <th className="px-3 py-2 text-left text-white font-medium text-sm">Status</th>
                    <th className="px-3 py-2 text-left text-white font-medium text-sm">Player</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="border-b border-gray-600">
                      <td className="px-3 py-2 text-gray-300 text-xs">{record.dare}</td>
                      <td className="px-3 py-2">
                        <div className="flex items-center space-x-2">
                          {record.status === 'Done' ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2 text-gray-300 text-xs">{record.player}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400">
              <Zap className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-medium">No dares completed yet</p>
              <p className="text-xs">Start playing to see records here!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
