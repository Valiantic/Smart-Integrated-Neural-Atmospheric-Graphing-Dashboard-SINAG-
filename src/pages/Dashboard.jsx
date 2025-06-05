import React, { useEffect, useState } from 'react';
import { fetchPastWeather } from '../services/weatherService';
import { predictNext7DaysFeelsLike } from '../ml/predictFeelsLike';

export default function Dashboard() {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const load = async () => {
      const pastWeather = await fetchPastWeather('Manila', '2024-05-01', '2024-05-14');
      const predicted = await predictNext7DaysFeelsLike(pastWeather);
      setForecast(predicted);
    };
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Smart Integrated Neural Atmospheric Graphing</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`rounded-lg shadow-md p-4 ${
              day.feelslike >= 42 ? 'bg-red-200 border border-red-600' : 'bg-blue-100'
            }`}
          >
            <h2 className="text-xl text-black font-semibold">{day.day}</h2>
            <p className="text-2xl  text-black">{day.feelslike}°C</p>
            {day.feelslike >= 42 && (
              <p className="text-red-700 font-bold mt-2">⚠️ Class Suspension</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
