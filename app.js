import { WeatherService } from "./modules/WeatherService.js";
import { WeatherData } from "./modules/WeatherData.js";
import {ForecastData} from "./modules/ForecastData.js";
import { SearchForm } from "./modules/ui/SearchForm.js";
import { WeatherDisplay } from "./modules/ui/WeatherDisplay.js"


class AppLogic {
    constructor() {
        this.searchForm = new SearchForm('#location');
        this.weatherDisplay = new WeatherDisplay('.data-display');
        this.init();  // Initialize automatically
    }
    
    init() {
        this.searchFlow();
    }

    searchFlow() {
        this.searchForm.form.addEventListener('citySearch', async (event) => {
            const cityName = event.detail.cityName;
            if (!cityName.trim()) {
                this.weatherDisplay.displayError('Please Enter a City Name')
                return;
            }
            this.weatherDisplay.displayLoading()
            try {
                // Get current weather data
                const currentRawData = await WeatherService.getWeatherByCity((cityName));
                const cleanCurrentData = new WeatherData(currentRawData);

                const lat = currentRawData.coord.lat;
                const lon = currentRawData.coord.lon;

                // Get forecast weather data
                const forecastRawData = await WeatherService.getForecastByCoords(lat, lon);
                console.log('Forecast raw data:', forecastRawData);
                const cleanForecastData = new ForecastData(forecastRawData);
        
                // Display today's data
                this.weatherDisplay.displayWeather(cleanCurrentData);
                //Display Next 24 hours
                // this.weatherDisplay.displayHourlyForecast(cleanForecastData.getNext24Hours());
                // Display Next 5 days
                this.weatherDisplay.displayDailyForecast(cleanForecastData.getNextFiveDays());
                


            } catch (error) {
                console.log('Error:', error)

                if (error.message.includes('404')) {
                    this.weatherDisplay.displayError(`City "${cityName}" not found. Please check spelling and try again.`);
                }
            }
        }) 
    }
    
}

const app = new AppLogic();









