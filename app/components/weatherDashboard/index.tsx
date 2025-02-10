"use client";

import { fetchWeather } from "@/app/lib/fetchWeather";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import MaxTemperatureChart from "../maxTemperatureChart";
import MinTemperatureChart from "../minTemperatureChart";
import SearchBar from "../searchBar";
import WeatherCard from "../weatherCard";
import WeatherDetails from "../weatherDetails";

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<any | null>(null);
  const [city, setCity] = useState<string>("Madrid");

  const handleSearch = async (newCity: string) => {
    setCity(newCity);
    const data = await fetchWeather(newCity);
    setWeather(data);
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6 w-full"
      initial={{ paddingTop: "5rem" }}
      animate={{ paddingTop: weather ? "2rem" : "5rem" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Barra de búsqueda con animación al subir */}
      <motion.div
        key="searchBar"
        initial={{ y: 0 }}
        animate={{ y: weather ? -40 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <SearchBar onSearch={handleSearch} />
      </motion.div>

      {/* Mostrar el clima solo si hay datos */}
      <AnimatePresence>
        {weather && (
          <>
            <motion.div
              key="weatherCard"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <WeatherCard weather={weather} />
            </motion.div>

            <motion.div
              key="weatherDetails"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
            >
              <WeatherDetails weather={weather} />
            </motion.div>

            {/* Gráficos separados */}
            <motion.div
              key="charts"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeInOut", delay: 0.6 }}
            >
              <motion.div
                key="maxChart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.9 }}
              >
                <MaxTemperatureChart city={city} />
              </motion.div>

              <motion.div
                key="minChart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 1, ease: "easeInOut", delay: 1.2 }}
              >
                <MinTemperatureChart city={city} />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
