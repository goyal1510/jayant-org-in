'use client';

import { useState } from 'react';
import { RotateCcw, RefreshCw } from 'lucide-react';

export default function TicTacToe() {
  const [boxes, setBoxes] = useState<string[]>(Array(9).fill(''));
  const [turnO, setTurnO] = useState(true);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [isDraw, setIsDraw] = useState(false);

  const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8],
    [1, 4, 7], [2, 5, 8], [2, 4, 6],
    [3, 4, 5], [6, 7, 8]
  ];

  const checkWinner = (currentBoxes: string[]) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (currentBoxes[a] && currentBoxes[a] === currentBoxes[b] && currentBoxes[a] === currentBoxes[c]) {
        return currentBoxes[a];
      }
    }
    return null;
  };

  const handleBoxClick = (index: number) => {
    if (boxes[index] || winner || isDraw) return;

    const newBoxes = [...boxes];
    newBoxes[index] = turnO ? 'O' : 'X';
    setBoxes(newBoxes);
    setTurnO(!turnO);
    setCount(count + 1);

    const newWinner = checkWinner(newBoxes);
    if (newWinner) {
      setWinner(newWinner);
    } else if (count + 1 === 9) {
      setIsDraw(true);
    }
  };

  const resetGame = () => {
    setBoxes(Array(9).fill(''));
    setTurnO(true);
    setCount(0);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-800 rounded-xl p-8 shadow-xl max-w-2xl w-full">
        {/* Game Status */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {winner ? `Winner: ${winner}` : isDraw ? 'Game Draw!' : `Turn: ${turnO ? 'O' : 'X'}`}
          </h2>
          <p className="text-gray-400">Click on any box to make your move</p>
        </div>

        {/* Winner/Draw Message */}
        {(winner || isDraw) && (
          <div className="bg-blue-600 text-white p-4 rounded-lg mb-6 text-center">
            <p className="text-lg font-semibold">
              {winner ? `Congratulations! ${winner} wins!` : 'Game was a Draw!'}
            </p>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-8">
          {boxes.map((value, index) => (
            <button
              key={index}
              onClick={() => handleBoxClick(index)}
              disabled={!!value || !!winner || isDraw}
              className="w-20 h-20 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-3xl font-bold text-white transition-colors duration-200 flex items-center justify-center"
            >
              {value}
            </button>
          ))}
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <RotateCcw className="h-5 w-5" />
            <span>New Game</span>
          </button>
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            <RefreshCw className="h-5 w-5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
