'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { WeatherData, ForecastData, ForecastItem } from '@/types/weather';

const API_KEY = "48118fe8352ed4398205c8db917f6718";

export default function WeatherDashboard() {
  const [cityInput, setCityInput] = useState('');
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load recent cities from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('recentCities');
    if (saved) {
      setRecentCities(JSON.parse(saved));
    }
  }, []);

  // Auto-fetch weather for current location on app load
  useEffect(() => {
    const loadInitialWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLoading(true);
            try {
              const weatherData = await getWeatherByLocation(latitude, longitude);
              if (weatherData) {
                const forecastData = await get5DayForecastByLocation(latitude, longitude);
                if (forecastData) {
                  updateForecastUI(forecastData);
                }
              }
            } catch (error) {
              console.log('Could not load initial weather:', error);
            } finally {
              setLoading(false);
            }
          },
          (error) => {
            console.log('Geolocation not available:', error.message);
            // Don't show alert for initial load, just log it
          }
        );
      }
    };

    loadInitialWeather();
  });

  // Save recent cities to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
  }, [recentCities]);

  const saveRecentCity = (city: string) => {
    if (!recentCities.includes(city)) {
      setRecentCities(prev => [city, ...prev.slice(0, 4)]); // Keep only 5 recent cities
    } else {
      // If city already exists, move it to the top
      setRecentCities(prev => [city, ...prev.filter(c => c !== city).slice(0, 4)]);
    }
  };

  const getWeatherByCity = async (city: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("City not found");
      const data: WeatherData = await response.json();
      saveRecentCity(city);
      setCurrentWeather(data);
      setCityInput(data.name);
      return data;
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const get5DayForecastByCity = async (city: string) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Forecast not available");
      const data: ForecastData = await response.json();
      return data;
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const getWeatherByLocation = async (lat: number, lon: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Location weather not available");
      const data: WeatherData = await response.json();
      saveRecentCity(data.name);
      setCurrentWeather(data);
      setCityInput(data.name);
      return data;
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const get5DayForecastByLocation = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error("Location forecast not available");
      const data: ForecastData = await response.json();
      return data;
    } catch (error) {
      alert(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleSearch = async () => {
    if (cityInput.trim()) {
      const weatherData = await getWeatherByCity(cityInput.trim());
      if (weatherData) {
        const forecastData = await get5DayForecastByCity(cityInput.trim());
        if (forecastData) {
          updateForecastUI(forecastData);
        }
      }
    }
  };

  const handleCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await getWeatherByLocation(latitude, longitude);
          if (weatherData) {
            const forecastData = await get5DayForecastByLocation(latitude, longitude);
            if (forecastData) {
              updateForecastUI(forecastData);
            }
          }
        },
        (error) => {
          alert("Unable to get your location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const updateForecastUI = (forecastData: ForecastData) => {
    const today = new Date();
    const nextFiveDays = Array.from({ length: 5 }, (_, i) => {
      const nextDay = new Date(today);
      nextDay.setDate(today.getDate() + i + 1);
      return nextDay;
    });

    const dailyForecasts = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    const forecastItems: ForecastItem[] = nextFiveDays.map((date, index) => {
      const forecast = dailyForecasts[index] || dailyForecasts[0];
      return {
        date,
        temp: forecast.main.temp,
        description: forecast.weather[0].description,
        icon: forecast.weather[0].icon,
        humidity: forecast.main.humidity,
        windSpeed: forecast.wind.speed,
      };
    });

    setForecast(forecastItems);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getWeatherBgColor = (description: string) => {
    if (description.includes("cloud")) return "bg-gray-400";
    if (description.includes("rain")) return "bg-blue-500";
    if (description.includes("clear")) return "bg-yellow-300";
    return "bg-blue-500";
  };

  const getForecastCardStyle = (description: string) => {
    const baseClasses = "text-white p-4 rounded-lg text-center transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer";
    
    if (description.includes("cloud")) {
      return `${baseClasses} bg-gray-600 hover:bg-gray-700`;
    } else if (description.includes("rain") || description.includes("drizzle")) {
      return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
    } else if (description.includes("clear") || description.includes("sun")) {
      return `${baseClasses} bg-yellow-600 hover:bg-yellow-700`;
    } else if (description.includes("snow")) {
      return `${baseClasses} bg-blue-400 hover:bg-blue-500`;
    } else if (description.includes("thunder") || description.includes("storm")) {
      return `${baseClasses} bg-purple-600 hover:bg-purple-700`;
    } else if (description.includes("fog") || description.includes("mist")) {
      return `${baseClasses} bg-gray-500 hover:bg-gray-600`;
    } else {
      return `${baseClasses} bg-blue-600 hover:bg-blue-700`;
    }
  };

  const getForecastTextColor = (description: string) => {
    if (description.includes("clear") || description.includes("sun")) {
      return "text-yellow-100";
    } else if (description.includes("cloud")) {
      return "text-gray-100";
    } else if (description.includes("rain") || description.includes("drizzle")) {
      return "text-blue-100";
    } else if (description.includes("snow")) {
      return "text-blue-100";
    } else if (description.includes("thunder") || description.includes("storm")) {
      return "text-purple-100";
    } else if (description.includes("fog") || description.includes("mist")) {
      return "text-gray-100";
    } else {
      return "text-blue-100";
    }
  };

  const getForecastDetailColor = (description: string) => {
    if (description.includes("clear") || description.includes("sun")) {
      return "text-yellow-200";
    } else if (description.includes("cloud")) {
      return "text-gray-200";
    } else if (description.includes("rain") || description.includes("drizzle")) {
      return "text-blue-200";
    } else if (description.includes("snow")) {
      return "text-blue-200";
    } else if (description.includes("thunder") || description.includes("storm")) {
      return "text-purple-200";
    } else if (description.includes("fog") || description.includes("mist")) {
      return "text-gray-200";
    } else {
      return "text-blue-200";
    }
  };

  const handleRecentCityClick = async (city: string) => {
    setShowDropdown(false);
    const weatherData = await getWeatherByCity(city);
    if (weatherData) {
      const forecastData = await get5DayForecastByCity(city);
      if (forecastData) {
        updateForecastUI(forecastData);
      }
    }
  };

  return (
    <div className="weather-bg min-h-screen">
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold text-center text-white mb-8">Weather Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Controls Section */}
          <div className="flex flex-col py-4 px-8 bg-gray-700 border rounded-md w-full md:w-1/4 bg-opacity-70">
            <div className="flex flex-col gap-2">
              <span className="text-xl text-white font-bold">Enter the city:</span>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Enter a city"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className="p-2 border rounded-md w-full mb-2 mt-2 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-2 h-10 bg-blue-500 w-full text-white rounded-md mt-2 hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center"
                >
                  {loading ? 'Loading...' : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="text-center text-white text-xl mb-2">or</div>

            <div className="flex flex-col gap-2 justify-center">
              <button
                onClick={handleCurrentLocation}
                disabled={loading}
                className="px-4 py-2 bg-gray-500 text-white w-full rounded-md mb-2 hover:bg-gray-600 disabled:opacity-50 flex items-center justify-center"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Current Location
              </button>

              {/* Recent Searches Dropdown */}
              {recentCities.length > 0 && (
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="mt-1 w-full px-4 py-2 bg-gray-500 text-white rounded-md flex justify-between items-center hover:bg-gray-600"
                  >
                    <span>Recent Searches</span>
                    {showDropdown ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
                  </button>
                  {showDropdown && (
                    <div className="absolute mt-1 w-full bg-gray-500 text-white rounded-md shadow-lg max-h-32 overflow-y-auto z-10">
                      <ul className="py-1">
                        {recentCities.map((city, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleRecentCityClick(city)}
                              className="w-full text-left px-4 py-2 hover:bg-gray-600"
                            >
                              {city}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Forecast Section */}
          <div className="flex flex-col p-4 bg-gray-700 border rounded-md w-full md:w-3/4 bg-opacity-70">
            {/* Current Weather */}
            {currentWeather && (
              <div className={`${getWeatherBgColor(currentWeather.weather[0].description)} text-white p-4 rounded-md mb-4 transition-all duration-300 hover:scale-y-110 hover:shadow-lg`}>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-3xl font-bold">
                      {currentWeather.name}
                    </h1>
                    <h1 className="text-xs sm:text-lg md:text-xl lg:text-xl">
                      {formatDate(new Date())}
                    </h1>
                    <br />
                    <p className="text-xs mb-1 sm:text-lg md:text-xl lg:text-xl">
                      Wind: {currentWeather.wind.speed} m/s
                    </p>
                    <p className="text-xs sm:text-lg md:text-xl lg:text-xl">
                      Humidity: {currentWeather.main.humidity}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl sm:text-2xl lg:text-4xl md:text-3xl">
                      {currentWeather.main.temp}°C
                    </p>
                  </div>
                  <div className="text-center">
                    <Image
                      src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
                      alt={currentWeather.weather[0].description}
                      width={96}
                      height={96}
                      className="mx-auto w-12 h-12 md:w-24 md:h-24 lg:w-30 md:h-30"
                      title={currentWeather.weather[0].description}
                    />
                    <p className="text-xs sm:text-lg md:text-xl lg:text-xl text-center">
                      {currentWeather.weather[0].description.charAt(0).toUpperCase() + 
                       currentWeather.weather[0].description.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Future Forecast */}
            {forecast.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-center mt-4 mb-4 text-white">5-Day Forecast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {forecast.map((item, index) => (
                    <div 
                      key={index} 
                      className={getForecastCardStyle(item.description)}
                    >
                      <h3 className={`font-semibold text-sm mb-2 ${getForecastTextColor(item.description)}`}>
                        {item.date.toLocaleDateString('en-US', { weekday: 'short' })}
                      </h3>
                      <p className={`text-xs mb-3 ${getForecastDetailColor(item.description)}`}>
                        {item.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                      <div className="mb-3">
                        <Image
                          src={`https://openweathermap.org/img/wn/${item.icon}@2x.png`}
                          alt={item.description}
                          width={64}
                          height={64}
                          className="mx-auto w-12 h-12 mb-2"
                        />
                      </div>
                      <p className="text-lg font-bold mb-2 text-white">{Math.round(item.temp)}°C</p>
                      <p className={`text-xs mb-2 ${getForecastTextColor(item.description)} capitalize`}>{item.description}</p>
                      <div className={`space-y-1 text-xs ${getForecastDetailColor(item.description)}`}>
                        <p>Wind: {item.windSpeed} m/s</p>
                        <p>Humidity: {item.humidity}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
