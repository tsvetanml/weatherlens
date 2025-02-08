export default function WeatherDetails({ weather }: { weather: any }) {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl p-4 w-full shadow-lg text-center">
      <div className="grid grid-cols-2 gap-4 text-gray-300">
        <p>💧 Humedad: <span className="font-bold">{weather.main.humidity}%</span></p>
        <p>💨 Viento: <span className="font-bold">{weather.wind.speed} m/s</span></p>
        <p>🌅 Amanecer: <span className="font-bold">{new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</span></p>
        <p>🌇 Atardecer: <span className="font-bold">{new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</span></p>
      </div>
    </div>
  );
}
