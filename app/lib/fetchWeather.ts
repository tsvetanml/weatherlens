const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeather(city: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Error al obtener los datos");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchWeather:", error);
    return null;
  }
}

export async function fetchCitySuggestions(query: string) {
  if (!query) return [];
  try {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    if (!res.ok)
      throw new Error("Error al obtener las sugerencias de ciudades");
    return await res.json();
  } catch (error) {
    console.error("Error en fetchCitySuggestions:", error);
    return [];
  }
}

export async function fetchForecast(city: string): Promise<any[]> {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const BASE_URL = "https://api.openweathermap.org/data/2.5";

    const res = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Error al obtener el pronóstico");

    const data = await res.json();

    // Agrupar datos por día para obtener máximas y mínimas
    const dailyData = data.list.reduce((acc: any, entry: any) => {
      const date = entry.dt_txt.split(" ")[0]; // Extraer solo la fecha (YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = {
          date: new Date(entry.dt * 1000).toLocaleDateString("es-ES", {
            weekday: "short",
          }),
          temp_max: entry.main.temp_max,
          temp_min: entry.main.temp_min,
        };
      } else {
        acc[date].temp_max = Math.max(acc[date].temp_max, entry.main.temp_max);
        acc[date].temp_min = Math.min(acc[date].temp_min, entry.main.temp_min);
      }

      return acc;
    }, {});

    return Object.values(dailyData).slice(0, 7); // Solo los próximos 7 días
  } catch (error) {
    console.error("Error en fetchForecast:", error);
    return [];
  }
}
