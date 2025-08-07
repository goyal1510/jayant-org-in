# Game Spot 🎮

A modern Next.js gaming hub featuring multiple classic games with a beautiful, responsive interface and left-side navigation.

## Features

- **Modern UI/UX**: Clean, dark theme with smooth animations and hover effects
- **Left-Side Navigation**: Easy navigation between games with active state indicators
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Multiple Games**: Three classic games included
- **TypeScript**: Full type safety throughout the application

## Games Included

### 🎯 Tic Tac Toe
- Classic X and O game for two players
- Turn-based gameplay with win detection
- Reset and new game functionality
- Visual feedback for game state

### ✂️ Rock Paper Scissors
- Play against the computer
- Score tracking for both player and computer
- Visual display of choices
- Animated game elements

### ⚡ Dare X
- Random dare generator for two players
- Player name customization
- Score tracking for completed dares
- Dare history and status tracking
- Reset functionality

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd apps/game-spot
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with sidebar
│   ├── page.tsx            # Dashboard/home page
│   ├── tic-tac-toe/        # Tic Tac Toe game page
│   ├── rock-paper-scissors/ # Rock Paper Scissors game page
│   └── dare-x/             # Dare X game page
├── components/
│   ├── Sidebar.tsx         # Left-side navigation
│   └── games/
│       ├── TicTacToe.tsx   # Tic Tac Toe game component
│       ├── RockPaperScissors.tsx # Rock Paper Scissors game component
│       └── DareX.tsx       # Dare X game component
public/
└── assets/
    ├── images/             # Game card images
    └── games/              # Game-specific assets
```

## Game Assets

The project includes all necessary game assets:
- Game card images for the dashboard
- Rock, paper, scissors images for RPS game
- Dare X JSON data file with 285+ dares

## Customization

### Adding New Games

1. Create a new game component in `src/components/games/`
2. Add a new page in `src/app/`
3. Update the navigation in `src/components/Sidebar.tsx`
4. Add game card to the dashboard in `src/app/page.tsx`

### Styling

The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.ts`
- Global styles in `src/app/globals.css`
- Component-specific styles using Tailwind classes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Author

Created by Jayant

---

Enjoy playing! 🎉
