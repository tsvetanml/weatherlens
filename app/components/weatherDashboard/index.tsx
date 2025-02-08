"use client";


import { fetchWeather } from "@/app/lib/fetchWeather";
import { useState } from "react";
import SearchBar from "../searchBar";
import WeatherCard from "../weatherCard";
import WeatherDetails from "../weatherDetails";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<any | null>(null);

  const handleSearch = async (city: string) => {
    const data = await fetchWeather(city);
    setWeather(data);
  };

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Mostrar el clima solo si hay datos */}
      {weather && (
        <>
          <WeatherCard weather={weather} />
          <WeatherDetails weather={weather} />
        </>
      )}
    </div>
  );
}
