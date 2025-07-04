// import { WeatherData } from '../modules/WeatherData.js';

export class WeatherDisplay {
    constructor(displayClass) {
        this.display = document.querySelector(displayClass);
        this.nowElement = this.display.querySelector('.now')
        this.nameElement = this.display.querySelector('.name');
        this.tempElement = this.display.querySelector('.temp');
        this.descElement = this.display.querySelector('.description');
        this.humidElement = this.display.querySelector('.humidity');

        this.unitState = 'celsius';
        this.celsiusBtn = document.querySelector('.temp-btn.celsius');
        this.fahrenheitBtn = document.querySelector('.temp-btn.fahrenheit')

        this.currentWeatherData = null;
        this.display.style.display = 'none'

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

        this.nowElement.style.display = 'none';
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
        this.display.style.display = 'flex'
        this.nowElement.style.display = 'block';
        this.nameElement.style.display = 'block';
        this.tempElement.style.display = 'block';
        this.descElement.style.display = 'block';
        this.humidElement.style.display = 'block';
        
        
        //assign values to elements
        this.nowElement.textContent = 'Today';
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

    displayError(message) {
        const spinner = this.display.querySelector('.loading-spinner');
        if (spinner) spinner.remove();

        const daysContainer = document.querySelector('.days-display');
        if (daysContainer) daysContainer.innerHTML = '';

        this.nameElement.style.display = 'block';

        this.tempElement.style.display = 'none';
        this.descElement.style.display = 'none';
        this.humidElement.style.display = 'none';

        const existingIcon = this.display.querySelector('.icon');
        if (existingIcon) existingIcon.remove();

        this.nameElement.innerHTML = `
        <div class="error-message">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <p>${message}</p>
        </div>
        `
    }

    // displayHourlyForecast(cleanData) {
    //     nextFiveDays = cleanData.getN
    // }



    displayDailyForecast(cleanData) {
        console.log(cleanData);
        const daysContainer = document.querySelector('.days-display');

        if (daysContainer) daysContainer.innerHTML = ''

        cleanData.forEach((item, index) => {
            const card = document.createElement('div');
            card.classList.add('day-cards')
            card.innerHTML = `
                <div class='for-date'>${item.getDayName()}</div>
                <div class='for-date'>${item.getDateString()}</div>
                <img class='for-icon' src='./assets/${item.icon}.svg' width='60' height='60'>
                <div class='for-temp'>${item.getCelsius() + '°C'}</div>
                <div class='for-description'>${item.description}</div>
                <div class='for-humidity'>humidity: ${item.humidity}%</div>
        `;
        daysContainer.appendChild(card)
        })
        
        
        

    }
}