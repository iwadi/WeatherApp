import '/src/App.css';
import { useState } from 'react';

interface WeatherData {
    temp: number | null;
    tempMax: number | null;
    tempMin: number | null;
    condition: string | null;
}

interface CurrentWeatherProps {
    setWeatherLoaded: (loaded: boolean) => void;
    setCity: (city: string) => void; // Новый пропс для передачи города
}

function CurrentWeather({ setWeatherLoaded, setCity }: CurrentWeatherProps) {
    const [weatherData, setWeatherData] = useState<WeatherData>({
        temp: null,
        tempMax: null,
        tempMin: null,
        condition: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cityInput, setCityInput] = useState<string>(''); // Локальное состояние для ввода

    const API_KEY = 'a3020bcd380e283571def6dc5e97aea1';

    const fetchWeatherByCity = async (cityName: string) => {
        try {
        setLoading(true);
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) {
            throw new Error('Город не найден или ошибка API');
        }
        const data = await response.json();
        setWeatherData({
            temp: Math.round(data.main.temp),
            tempMax: Math.round(data.main.temp_max),
            tempMin: Math.round(data.main.temp_min),
            condition: data.weather[0].main,
        });
        setError(null);
        setWeatherLoaded(true);
        setCity(cityName); // Обновляем город в родительском компоненте
        } catch (err) {
        setError('Ошибка: ' + (err instanceof Error ? err.message : 'Неизвестная ошибка'));
        setWeatherData({ temp: null, tempMax: null, tempMin: null, condition: null });
        setWeatherLoaded(false);
        setCity(''); // Сбрасываем город при ошибке
        } finally {
        setLoading(false);
        }
    };

    const handleCitySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (cityInput.trim()) {
        fetchWeatherByCity(cityInput);
        }
    };

    const getWeatherIcon = (condition: string | null, temp: number | null) => {
        const tempValue = temp ?? 0;
        const lowerCondition = condition?.toLowerCase();

        if (tempValue <= -10) return '❄️';
        if (tempValue >= 30) return '☀️';

        switch (lowerCondition) {
        case 'clear':
            return tempValue > 0 ? '☀️' : '🌤️';
        case 'clouds':
            return tempValue > 0 ? '☁️' : '🌥️';
        case 'rain':
            return tempValue > 0 ? '☔' : '🌧️';
        case 'snow':
            return '❄️';
        case 'thunderstorm':
            return '⛈️';
        case 'drizzle':
            return '🌧️';
        case 'mist':
        case 'fog':
            return '🌫️';
        default:
            if (tempValue <= 0) return '❄️';
            if (tempValue > 20) return '☀️';
            return '🌡️';
        }
    };

    return (
        <>
        <div>
            <form className="CurrentWeather-form" onSubmit={handleCitySubmit}>
            <input
                className="CurrentWeather-input"
                type="text"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                placeholder="Введите название города"
            />
            <button className="CurrentWeather-button" type="submit">
                Узнать погоду
            </button>
            </form>

            {loading && <div>Загрузка погоды...</div>}
            {error && <div>{error}</div>}
            {!loading && !error && weatherData.temp !== null && (
            <div className="current-weather">
                <div className="weather-icon">
                {getWeatherIcon(weatherData.condition, weatherData.temp)}
                </div>
                <div className="high-low">
                <div className="temperature-Hi">
                    <span>Hi</span> {weatherData.tempMax}°
                </div>
                <div className="temperature">{weatherData.temp}°</div>
                <div className="temperature-Lo">
                    <span>Lo</span> {weatherData.tempMin}°
                </div>
                </div>
            </div>
            )}
        </div>
        </>
    );
}

export default CurrentWeather;