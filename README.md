# jayant-org-in

A modern monorepo containing a collection of web applications and tools built with Next.js, TypeScript, and Tailwind CSS. This repository serves as a centralized hub for various projects, demonstrating different aspects of web development and modern application architecture.

## 🚀 Projects

### 📊 [Portfolio](apps/portfolio/)
A modern, responsive portfolio website showcasing my skills, experience, and projects.

**Features:**
- Responsive design with dark/light theme
- Interactive sections for skills, experience, and projects
- Certificate showcase
- Contact form
- Modern animations and transitions

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Lucide React

---

### 💰 [Cash Counter](apps/currency-calculator/)
A comprehensive cash management system for tracking Indian Rupee denominations with Supabase backend.

**Features:**
- Currency denomination tracking (₹1, ₹2, ₹5, ₹10, ₹20, ₹50, ₹100, ₹200, ₹500)
- Bundle & open notes management
- Real-time total calculations
- History management with date navigation
- User authentication with Supabase
- Dark/light theme toggle
- Notes and timestamps for entries

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Supabase (PostgreSQL, Auth)

---

### 🎮 [Game Spot](apps/game-spot/)
A modern gaming hub featuring classic games with enhanced UI and functionality.

**Games Included:**
- **Tic Tac Toe**: Classic X and O game with modern UI
- **Rock Paper Scissors**: Interactive game against computer
- **Dare X**: Truth or dare game with custom dares and auto-switching

**Features:**
- Side-by-side game and records display
- Custom dares management with import/export
- Local storage persistence
- Auto-player switching
- Responsive design

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, Lucide React

---

### 🌤️ [Weather Dashboard](apps/weather/)
A comprehensive weather application with current conditions and 5-day forecasts.

**Features:**
- Real-time weather data from OpenWeatherMap API
- Current location weather using geolocation
- 5-day weather forecast with dynamic styling
- Recent searches with local storage
- Weather-based color themes
- Responsive design

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS, OpenWeatherMap API

## 🛠️ Tech Stack

### Core Technologies
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Monorepo**: Turbo

### Development Tools
- **Linting**: ESLint
- **Type Checking**: TypeScript
- **Build Tool**: Turbo
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/jayant-org-in.git
   cd jayant-org-in
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development servers:**

   **Portfolio:**
   ```bash
   pnpm --filter portfolio dev
   ```

   **Cash Counter:**
   ```bash
   pnpm --filter currency-calculator dev
   ```

   **Game Spot:**
   ```bash
   pnpm --filter game-spot dev
   ```

   **Weather Dashboard:**
   ```bash
   pnpm --filter weather dev
   ```

   **All apps at once:**
   ```bash
   pnpm dev
   ```

### Building for Production

```bash
# Build all apps
pnpm build

# Build specific app
pnpm --filter <app-name> build
```

## 📁 Project Structure

```
jayant-org-in/
├── apps/
│   ├── portfolio/           # Personal portfolio website
│   ├── currency-calculator/ # Currency conversion app
│   ├── game-spot/          # Gaming hub with multiple games
│   └── weather/            # Weather dashboard app
├── packages/               # Shared packages (if any)
├── package.json           # Root package.json
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── turbo.json            # Turbo build configuration
└── README.md             # This file
```

## 🎯 Features Across Projects

### Common Features
- **Responsive Design**: All apps work perfectly on desktop, tablet, and mobile
- **TypeScript**: Full type safety across all applications
- **Modern UI**: Clean, professional interfaces with Tailwind CSS
- **Performance**: Optimized with Next.js 15 features
- **Accessibility**: Built with accessibility best practices
- **SEO Optimized**: Proper metadata and structured data

### Unique Features
- **Portfolio**: Dark/light theme, certificate showcase, contact form
- **Cash Counter**: Indian Rupee denomination tracking, bundle management, history
- **Game Spot**: Custom dares, local storage, auto-switching players
- **Weather**: Geolocation, dynamic styling, 5-day forecasts

## 🌟 Highlights

- **Modern Architecture**: Built with the latest Next.js 15 features
- **Type Safety**: Full TypeScript implementation
- **Performance**: Optimized images, lazy loading, and efficient builds
- **User Experience**: Intuitive interfaces with smooth animations
- **Code Quality**: Clean, maintainable code with proper documentation
- **Scalability**: Monorepo structure for easy project management

## 📱 Live Demos

- **Portfolio**: [https://portfolio.jayant.org.in/]
- **Weather Dashboard**: [https://weather.jayant.org.in/]
- **Game Spot**: [https://game-spot.jayant.org.in/]
- **Currency Calculator**: [https://currency-calculator.jayant.org.in/]

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

- **Email**: [goyal151002@gmail.com](mailto:goyal151002@gmail.com)
- **Phone**: [+91 94134 95328](tel:+919413495328)
- **Location**: [Hyderabad, India](https://maps.google.com/?q=Aditya+Empress+Towers,+8-1-307/3-8/AET,+beside+Passport+Office,+Shaikpet,+Hyderabad,+Telangana+500008)
- **GitHub**: [github.com/goyal1510](https://github.com/goyal1510)
- **LinkedIn**: [linkedin.com/in/jayant-29714220b](https://www.linkedin.com/in/jayant-29714220b/)
- **Instagram**: [instagram.com/goyal_1510](https://www.instagram.com/goyal_1510/)

---

**Built with ❤️ by Jayant**

*This monorepo demonstrates modern web development practices, from simple applications to complex, feature-rich web apps. Each project showcases different aspects of Next.js, TypeScript, and modern application architecture.*