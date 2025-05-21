// import { WeatherData } from '../modules/WeatherData.js';

export class WeatherDisplay {
    constructor(displayClass) {
        this.display = document.querySelector(displayClass);
        this.nameElement = this.display.querySelector('.name');
        this.tempElement = this.display.querySelector('.temp');
        this.descElement = this.display.querySelector('.description');
        this.humidElement = this.display.querySelector('.humidity');

        this.unitState = 'celsius';
        this.celsiusBtn = document.querySelector('.temp-btn.celsius');
        this.fahrenheitBtn = document.querySelector('.temp-btn.fahrenheit')

        this.currentWeatherData = null;

        if (this.celsiusBtn && this.fahrenheitBtn) {
            this.celsiusBtn.addEventListener('click', () => this.toggleTemperatureUnit('celsius'));
            this.fahrenheitBtn.addEventListener('click', () => this.toggleTemperatureUnit('fahrenheit'));
        }
        
    }

    toggleTemperatureUnit(unit) {
        // Only do something if unit is changing
        if (this.unitState === unit) return;
        
        // Update unit
        this.unitState = unit;
        
        // Update button states
        this.celsiusBtn.classList.toggle('active', unit === 'celsius');
        this.fahrenheitBtn.classList.toggle('active', unit === 'fahrenheit');

        // Move the slider
        const slider = document.querySelector('.slider');
        if (unit === 'fahrenheit') {
            slider.style.transform = 'translateX(100%)';
        } else {
            slider.style.transform = 'translateX(0)';
        }


        this.updateTemperatureDisplay();

    }


    updateTemperatureDisplay() {
        if (!this.currentWeatherData) return;
        const temp = this.unitState === 'celsius'? this.currentWeatherData.getCelsius() + '°C'  : this.currentWeatherData.getFahrenheit() + '°F';

        this.tempElement.textContent = temp;
    }




    displayLoading() {
        // check if spinner already exist
        if(this.display.querySelector('.loading-spinner')) return;

        this.nameElement.style.display = 'none';
        this.tempElement.style.display = 'none';
        this.descElement.style.display = 'none';
        this.humidElement.style.display = 'none';
        
        const existingIcon = this.display.querySelector('.icon');
        if (existingIcon) existingIcon.remove();


        // Show spinner
        this.display.insertAdjacentHTML('beforeend', `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <div class="loading-text">Getting weather data...</div>
            </div>
        `);
    }

    displayWeather(cleanData) {
        const spinner = this.display.querySelector('.loading-spinner');
        if (spinner) spinner.remove();

        this.currentWeatherData = cleanData;

        // Show elements
        this.nameElement.style.display = 'block';
        this.tempElement.style.display = 'block';
        this.descElement.style.display = 'block';
        this.humidElement.style.display = 'block';
        
        
        //assign values to elements
        this.nameElement.textContent = cleanData.cityName;
        this.tempElement.textContent = cleanData.getCelsius() + '°C';
        this.descElement.textContent = cleanData.description;
        this.humidElement.textContent =`humidity: ${cleanData.humidity}%`;

        this.displayWeatherIcon(cleanData.icon)


        // use current unit
        const temp = this.unitState === 'celsius' ? this.currentWeatherData.getCelsius() + '°C' : this.currentWeatherData.getFahrenheit() + '°F';

        this.tempElement.textContent = temp;
    }

    async displayWeatherIcon(iconCode) {
        try {
            console.log('Icon code received:', iconCode); // Add this line
            // Remove existing icon
            const existingIcon = this.display.querySelector('.icon');
            if (existingIcon) existingIcon.remove();

            const iconUrl = `./assets/${iconCode}.svg`

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