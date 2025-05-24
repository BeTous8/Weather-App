// import { WeatherService } from "./WeatherService.js";
// import {rawApiData} from WeatherService

export class WeatherData {
    constructor(rawApiData) {
        this.cityName = rawApiData.name
        this.temperature = rawApiData.main.temp;
        this.description = rawApiData.weather[0].description;
        this.humidity = rawApiData.main.humidity;
        this.icon = rawApiData.weather[0].icon;
        console.log('Weather info:', rawApiData.weather[0]);

        if (rawApiData.dt) {
            this.date = new Date(rawApiData.dt * 1000);
            this.dateString = this.date.toLocaleDateString();
            this.dayName = this.date.toLocaleDateString('en-US', {weekday: 'long'});
            console.log(`date is ${this.date}, dateString is ${this.dateString}, dayName is ${this.dayName}`);
        }
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

    getDate() {
        return this.date;
    }
    
    getDateString() {
        return this.dateString;
    }
    
    getDayName() {
        return this.dayName;
    }
}