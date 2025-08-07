import RockPaperScissors from '@/components/games/RockPaperScissors';

export default function RockPaperScissorsPage() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Rock Paper Scissors</h1>
        <RockPaperScissors />
      </div>
    </div>
  );
}
