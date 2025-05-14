import { WeatherService } from "./modules/WeatherService.js";
import { WeatherData } from "./modules/WeatherData.js";
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
        
            try {
                // Get weather data
                const CityRawData = await WeatherService.getWeatherByCity((cityName));
                const cleanData = new WeatherData(CityRawData);
        
                // Display it
                this.weatherDisplay.displayWeather(cleanData);
            } catch (error) {
                console.log('Error:', error)
            }
        }) 
    }
    
}

const app = new AppLogic();









