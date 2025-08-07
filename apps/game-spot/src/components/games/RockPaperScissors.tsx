'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RotateCcw } from 'lucide-react';

type Choice = 'rock' | 'paper' | 'scissors';

export default function RockPaperScissors() {
  const [userScore, setUserScore] = useState(0);
  const [compScore, setCompScore] = useState(0);
  const [message, setMessage] = useState('Choose your weapon!');
  const [messageColor, setMessageColor] = useState('bg-gray-600');
  const [userChoice, setUserChoice] = useState<Choice | null>(null);
  const [compChoice, setCompChoice] = useState<Choice | null>(null);

  const choices: Choice[] = ['rock', 'paper', 'scissors'];

  const genCompChoice = (): Choice => {
    const randIdx = Math.floor(Math.random() * 3);
    return choices[randIdx];
  };

  const drawGame = () => {
    setMessage('Game is Draw. Play again.');
    setMessageColor('bg-blue-600');
  };

  const showWinner = (userWin: boolean, userChoice: Choice, compChoice: Choice) => {
    if (userWin) {
      setUserScore(prev => prev + 1);
      setMessage(`You win! Your ${userChoice} beats ${compChoice}`);
      setMessageColor('bg-green-600');
    } else {
      setCompScore(prev => prev + 1);
      setMessage(`You lost. ${compChoice} beats your ${userChoice}`);
      setMessageColor('bg-red-600');
    }
  };

  const playGame = (userChoice: Choice) => {
    const compChoice = genCompChoice();
    setUserChoice(userChoice);
    setCompChoice(compChoice);

    if (userChoice === compChoice) {
      drawGame();
    } else {
      let userWin = true;
      if (userChoice === 'rock') {
        userWin = compChoice === 'paper' ? false : true;
      } else if (userChoice === 'paper') {
        userWin = compChoice === 'scissors' ? false : true;
      } else {
        userWin = compChoice === 'rock' ? false : true;
      }
      showWinner(userWin, userChoice, compChoice);
    }
  };

  const resetGame = () => {
    setUserScore(0);
    setCompScore(0);
    setMessage('Choose your weapon!');
    setMessageColor('bg-gray-600');
    setUserChoice(null);
    setCompChoice(null);
  };

  const getChoiceImage = (choice: Choice) => {
    return `/assets/games/Rock-Paper-Scissor/resources/${choice}.png`;
  };

  return (
    <div className="flex justify-center">
      <div className="bg-gray-800 rounded-xl p-8 shadow-xl max-w-4xl w-full">
        {/* Score Board */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <p className="text-gray-400 text-sm">You</p>
            <p className="text-3xl font-bold text-white">{userScore}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Computer</p>
            <p className="text-3xl font-bold text-white">{compScore}</p>
          </div>
        </div>

        {/* Message */}
        <div className={`${messageColor} text-white p-4 rounded-lg mb-8 text-center transition-colors duration-300`}>
          <p className="text-lg font-semibold">{message}</p>
        </div>

        {/* Choices Display */}
        {(userChoice || compChoice) && (
          <div className="flex justify-between items-center mb-8">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Your Choice</p>
              {userChoice && (
                <Image 
                  src={getChoiceImage(userChoice)} 
                  alt={userChoice}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              )}
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-2">Computer&apos;s Choice</p>
              {compChoice && (
                <Image 
                  src={getChoiceImage(compChoice)} 
                  alt={compChoice}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-contain"
                />
              )}
            </div>
          </div>
        )}

        {/* Game Choices */}
        <div className="flex justify-center space-x-6 mb-8">
          {choices.map((choice) => (
            <button
              key={choice}
              onClick={() => playGame(choice)}
              className="flex flex-col items-center space-y-2 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <Image 
                src={getChoiceImage(choice)} 
                alt={choice}
                width={64}
                height={64}
                className="w-16 h-16 object-contain"
              />
              <span className="text-white font-medium capitalize">{choice}</span>
            </button>
          ))}
        </div>

        {/* Reset Button */}
        <div className="text-center">
          <button
            onClick={resetGame}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 mx-auto"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Reset Game</span>
          </button>
        </div>
      </div>
    </div>
  );
}
