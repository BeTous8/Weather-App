// import { WeatherService } from "./WeatherService";
// import {rawApiData} from WeatherService

export class WeatherData {
    constructor(rawApiData) {
        this.cityName = rawApiData.name
        this.temperature = rawApiData.main.temp;
        this.description = rawApiData.weather[0].description;
        this.humidity = rawApiData.main.humidity;
        this.icon = rawApiData.weather[0].icon;
        console.log('Weather info:', rawApiData.weather[0]);
    }

    getCelsius() {
        return Math.round(this.temperature - 273.15);
    }

    getFahrenheit() {
        return Math.round((this.temperature -273.15) * 9/5 + 32);
    }

    getDescription() {
        return this.description;
    }
    
    getHumidity() {
        return this.humidity;
    }
}