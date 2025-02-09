"use client";

import { fetchForecast } from "@/app/lib/fetchWeather";
import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function WeatherChart({ city }: { city: string }) {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    async function loadForecast() {
      const data = await fetchForecast(city);
      if (data) {
        const formattedData = data.map((entry: any) => ({
          date: new Date(entry.dt * 1000).toLocaleDateString("es-ES", { weekday: "short" }),
          temp: entry.main.temp,
        }));
        setForecast(formattedData);
      }
    }
    loadForecast();
  }, [city]);

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl p-4 w-full shadow-lg text-center">
      <h2 className="text-lg font-semibold text-gray-300 mb-3">📈 Pronóstico semanal</h2>
      {forecast.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={forecast}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400">Cargando datos...</p>
      )}
    </div>
  );
}
