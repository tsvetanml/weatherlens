export default function WeatherCard({ weather }: { weather: any }) {
  return (
    <div className="bg-blue-600 bg-opacity-90 rounded-xl p-6 w-full shadow-lg text-center">
      <h2 className="text-2xl font-semibold">
        {weather.name}, {weather.sys.country}
      </h2>
      <p className="text-4xl font-bold">{weather.main.temp}°C</p>
      <p className="text-sm text-gray-200">{weather.weather[0].description}</p>
    </div>
  );
}
