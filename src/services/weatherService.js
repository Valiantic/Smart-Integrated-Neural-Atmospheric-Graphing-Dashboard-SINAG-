
const API_KEY = import.meta.env.VITE_VISUAL_CROSSING_API_KEY;

export const fetchPastWeather = async (location, startDate, endDate) => {
    const res = await fetch (
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/${startDate}/${endDate}?unitGroup=metric&key=${API_KEY}&include=days`
    );

    const data = await res.json();
    return data.days.map((day, index) => ({
    day: index + 1,
    feelslike: day.feelslike,
  }));
};