import React, { useState } from "react";
import axios from "axios";
import "../styles/WeatherApp.css";

type Weather = {
  name: string;
  main: { temp: number };
  weather: { description: string }[];
};

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherApp = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getWeather = async (cityName: string) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setError("Weather not found.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    getWeather(city);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="City name"
          value={city}
          className="weather-input"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
