// import { WeatherData } from '../modules/WeatherData.js';

export class WeatherDisplay {
    constructor(displayClass) {
        this.display = document.querySelector(displayClass);
        this.nameElement = this.display.querySelector('.name');
        this.tempElement = this.display.querySelector('.temp');
        this.descElement = this.display.querySelector('.description');
        this.humidElement = this.display.querySelector('.humidity');
    }

    displayLoading() {
        // check if spinner already exist
        if(this.display.querySelector('.loading-spinner')) return;

        this.nameElement.style.display = 'none';
        this.tempElement.style.display = 'none';
        this.descElement.style.display = 'none';
        this.humidElement.style.display = 'none';


        // Show spinner
        this.display.insertAdjacentHTML('beforeend', '<div class="loading-spinner">Loading...</div>');
    }

    displayWeather(cleanData) {
        const spinner = this.display.querySelector('.loading-spinner');
        if (spinner) spinner.remove();

        // Show elements
        this.nameElement.style.display = 'block';
        this.tempElement.style.display = 'block';
        this.descElement.style.display = 'block';
        this.humidElement.style.display = 'block';
        
        //assign values to elements
        this.nameElement.textContent = cleanData.cityName;
        this.tempElement.textContent = cleanData.getCelsius() + '°C';
        this.descElement.textContent = cleanData.description;
        this.humidElement.textContent =`humidity: ${cleanData.humidity}`;

        this.displayWeatherIcon(cleanData.icon)
    }

    async displayWeatherIcon(iconCode) {
        try {
            console.log('Icon code received:', iconCode); // Add this line
            // Remove existing icon
            const existingIcon = this.display.querySelector('img');
            if (existingIcon) existingIcon.remove();

            
            //Use API's icon URL
            // const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            // console.log('Icon URL:', iconUrl); // Add this line

            const iconUrl = `../../assets/${iconCode}.svg`

            const iconElement = document.createElement('img');
            iconElement.classList.add('icon');
            iconElement.src = iconUrl;
            iconElement.style.width = '120px';
            iconElement.style.height = '120px';
            iconElement.style.display = 'block';
            this.display.appendChild(iconElement);
        } catch (error) {
            console.log('No icon found for:', iconCode);
        }
    }
}