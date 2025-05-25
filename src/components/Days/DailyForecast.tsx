import WeatherDaily from './WeatherDaily';

interface DailyForecastProps {
    city: string;
}

function DailyForecast({ city }: DailyForecastProps) {
    return (
        <div className="daily-forecast">
            <WeatherDaily city={city} days={3} />
        </div>
    );
}

export default DailyForecast;