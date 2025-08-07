import Link from 'next/link';
import Image from 'next/image';
import { Square, Scissors, Zap } from 'lucide-react';

const games = [
  {
    name: 'Tic Tac Toe',
    description: 'Classic X and O game for two players',
    href: '/tic-tac-toe',
    icon: Square,
    image: '/assets/images/tictactoe.jpg',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Rock Paper Scissors',
    description: 'Test your luck against the computer',
    href: '/rock-paper-scissors',
    icon: Scissors,
    image: '/assets/images/rock-paper-scissors.jpg',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Dare X',
    description: 'Generate random dares for fun',
    href: '/dare-x',
    icon: Zap,
    image: '/assets/images/dare-x.jpg',
    color: 'from-purple-500 to-purple-600'
  }
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Game Spot</h1>
        <p className="text-gray-400 text-lg">Choose a game to start playing!</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link
            key={game.name}
            href={game.href}
            className="group block"
          >
            <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={game.image}
                  alt={game.name}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={game.name === 'Tic Tac Toe'} // Prioritize first game
                />
                <div className={`absolute top-4 right-4 p-2 rounded-lg bg-gradient-to-r ${game.color}`}>
                  <game.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {game.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {game.description}
                </p>
                <div className="mt-4 flex items-center text-blue-400 text-sm font-medium">
                  Play Now
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
