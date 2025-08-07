# Weather Dashboard

A modern Next.js weather dashboard that provides real-time weather data and 5-day forecasts for any city worldwide. Built with TypeScript, Tailwind CSS, and the OpenWeatherMap API.

## Features

- **🌍 Search Weather by City Name**: Enter any city name to get current weather and forecast data
- **📍 Current Location Weather**: Get weather data for your current location using geolocation
- **📅 5-Day Forecast**: View detailed weather forecasts for the next 4 days
- **📚 Recent Searches**: Automatically saves and displays recently searched cities
- **🎨 Responsive Design**: Beautiful, responsive UI that works on all devices
- **⚡ Real-time Data**: Live weather data from OpenWeatherMap API
- **💾 Local Storage**: Recent searches are saved locally in your browser

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.1
- **Icons**: Lucide React
- **API**: OpenWeatherMap API
- **State Management**: React Hooks (useState, useEffect)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository and navigate to the weather app:
   ```bash
   cd apps/weather
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
pnpm build
pnpm start
```

## Usage

1. **Search by City**: Enter a city name in the search field and click "Search" or press Enter
2. **Current Location**: Click "Current Location" to get weather for your current position
3. **Recent Searches**: Use the dropdown to quickly access previously searched cities
4. **View Forecast**: Current weather and 5-day forecast are displayed automatically

## Project Structure

```
apps/weather/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and Tailwind imports
│   │   ├── layout.tsx           # Root layout with metadata
│   │   └── page.tsx             # Main page component
│   ├── components/
│   │   └── WeatherDashboard.tsx # Main weather dashboard component
│   └── types/
│       └── weather.ts           # TypeScript interfaces for weather data
├── public/
│   ├── Backgound.jpg            # Background image
│   └── weather-favicon/         # App icons and favicon
├── package.json                 # Dependencies and scripts
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
└── README.md                    # This file
```

## API Reference

This project uses the [OpenWeatherMap API](https://openweathermap.org/api) to fetch weather data.

### Endpoints Used

- **Current Weather**: `https://api.openweathermap.org/data/2.5/weather`
- **5-Day Forecast**: `https://api.openweathermap.org/data/2.5/forecast`

### Environment Variables

The API key is currently hardcoded in the component. For production, consider using environment variables:

```env
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

## Features in Detail

### Current Weather Display
- Temperature in Celsius
- Weather description with icons
- Wind speed in m/s
- Humidity percentage
- Dynamic background colors based on weather conditions

### 5-Day Forecast
- Daily weather predictions
- Temperature, humidity, and wind data
- Weather icons for each day
- Responsive grid layout

### Recent Searches
- Automatically saves searched cities
- Dropdown menu for quick access
- Local storage persistence
- Maximum of 5 recent cities

### Geolocation
- Browser geolocation API integration
- Automatic weather data retrieval
- Error handling for unsupported browsers

## Responsive Design

The app is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## Performance Optimizations

- **Client-side rendering**: Fast initial load times
- **Efficient state management**: Minimal re-renders
- **Optimized API calls**: Proper error handling and loading states
- **Local storage**: Reduces API calls for recent searches

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Author

Jayant

## Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide React](https://lucide.dev/) for the beautiful icons
