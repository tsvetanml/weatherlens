"use client";

import { fetchForecast } from "@/app/lib/fetchWeather";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function MinTemperatureChart({ city }: { city: string }) {
  const [forecast, setForecast] = useState<any[]>([]);

  useEffect(() => {
    async function loadForecast() {
      const data = await fetchForecast(city);
      setForecast(data);
    }
    loadForecast();
  }, [city]);

  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl p-6 w-full shadow-lg text-center">
      <h2 className="text-lg font-semibold text-gray-300 mb-3">❄️ Temperaturas Mínimas</h2>
      {forecast.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={forecast}>
            <XAxis dataKey="date" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <Line type="monotone" dataKey="temp_min" stroke="#3498db" strokeWidth={3} dot={{ r: 5 }} name="Temp Mín" />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-400">Cargando datos...</p>
      )}
    </div>
  );
}
