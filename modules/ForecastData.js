import { WeatherData } from "./WeatherData.js";

export class ForecastData {
    constructor(forecastRawData) {
        this.rawData = forecastRawData;
        this.forecastList = forecastRawData.list;


        // Debug: Check what we're working with
        console.log('Total forecast items:', this.forecastList.length);
        console.log('Total forecast items:', this.rawData);
        console.log('First few items:', this.forecastList.slice(0, 3));

        // Debug: Check timestamps and hours
        this.forecastList.slice(0, 5).forEach((item, index) => {
            const date = new Date(item.dt * 1000);
            console.log(`Item ${index}: ${date} - Hour: ${date.getHours()}`);
        });
        
    }

    getNextFiveDays() {
        console.log('Filtering for noon forecasts...');
        
        const dailyForecasts = {};
    
        this.forecastList.forEach((item, index) => {
            const date = new Date(item.dt * 1000);
            const dateString = date.toDateString(); // "Fri May 23 2025"
            const hour = date.getHours();
            
            // Only consider midday hours (11-14)
            if (hour >= 11 && hour <= 14) {
                // Take the first midday forecast for each day
                if (!dailyForecasts[dateString] && index > 7) {
                    dailyForecasts[dateString] = item;
                    console.log("accepted item: ", dailyForecasts)
                }
            }
        });
        
        return Object.values(dailyForecasts)
            .slice(0, 5)
            .map(item => new WeatherData(item));
    }

    getNext24Hours() {
        return this.forecastList.slice(0, 8)
        .map(item => new WeatherData(item));
    }
}