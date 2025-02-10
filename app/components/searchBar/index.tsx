"use client";

import { fetchCitySuggestions } from "@/app/lib/fetchWeather";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);

  // Buscar sugerencias mientras el usuario escribe
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length > 2) {
        const results = await fetchCitySuggestions(city);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [city]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city);
    setSuggestions([]); // Limpiar sugerencias al buscar
  };

  return (
    <div className="relative w-full max-w-lg">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 bg-gray-800 bg-opacity-80 p-3 rounded-xl shadow-md w-full"
      >
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar ciudad..."
          className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg text-white"
        >
          Buscar
        </button>
      </form>

      {/* Dropdown de sugerencias */}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 w-full bg-gray-700 bg-opacity-90 mt-1 rounded-lg shadow-lg overflow-hidden">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.lat + suggestion.lon}
              className="px-4 py-2 hover:bg-gray-600 cursor-pointer text-white"
              onClick={() => {
                setCity(`${suggestion.name}, ${suggestion.country}`);
                onSearch(`${suggestion.name}, ${suggestion.country}`);
                setSuggestions([]);
              }}
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
