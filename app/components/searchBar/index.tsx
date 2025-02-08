"use client";

import { Search } from "lucide-react";
import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (city: string) => void }) {
  const [city, setCity] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city); // Enviar la ciudad al componente padre
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-3 bg-gray-800 bg-opacity-80 p-3 rounded-xl shadow-md w-full max-w-lg"
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
  );
}
