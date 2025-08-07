import TicTacToe from '@/components/games/TicTacToe';

export default function TicTacToePage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Tic Tac Toe</h1>
        <TicTacToe />
      </div>
    </div>
  );
}
