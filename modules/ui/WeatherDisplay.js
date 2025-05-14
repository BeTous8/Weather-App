// import { WeatherData } from '../modules/WeatherData.js';

export class WeatherDisplay {
    constructor(displayClass) {
        this.display = document.querySelector(displayClass);
        this.nameElement = this.display.querySelector('.name');
        this.tempElement = this.display.querySelector('.temp');
        this.descElement = this.display.querySelector('.description');
        this.humidElement = this.display.querySelector('.humidity')
    }

    displayWeather(cleanData) {
        this.nameElement.textContent = cleanData.cityName;
        this.tempElement.textContent = cleanData.getCelsius() + '°C';
        this.descElement.textContent = cleanData.description;
        this.humidElement.textContent =`humidity: ${cleanData.humidity}`;

    }
}