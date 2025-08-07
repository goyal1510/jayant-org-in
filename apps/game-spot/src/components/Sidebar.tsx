'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Home, Zap, Scissors, Square } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Tic Tac Toe', href: '/tic-tac-toe', icon: Square },
  { name: 'Rock Paper Scissors', href: '/rock-paper-scissors', icon: Scissors },
  { name: 'Dare X', href: '/dare-x', icon: Zap },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-800 border-r border-gray-700">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Gamepad2 className="h-8 w-8 text-blue-500" />
          <span className="text-xl font-bold text-white">Game Spot</span>
        </div>
      </div>
      
      <nav className="flex-1 space-y-1 px-4 py-6">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="border-t border-gray-700 p-4">
        <div className="text-xs text-gray-400 text-center">
          © 2024 Game Spot
        </div>
      </div>
    </div>
  );
}
