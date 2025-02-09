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

export async function fetchForecast(city: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=es`
    );
    if (!res.ok) throw new Error("Error al obtener el pronóstico");
    const data = await res.json();

    // Filtrar datos para obtener solo un punto por día (ejemplo: a las 12:00 PM)
    const dailyData = data.list.filter((entry: any) =>
      entry.dt_txt.includes("12:00:00")
    );

    return dailyData;
  } catch (error) {
    console.error("Error en fetchForecast:", error);
    return null;
  }
}
