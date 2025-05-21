

export class WeatherService {
    static async getWeatherByCity(cityName) {
        const API_Key = '63c3c7a41905b045647d9c90a7eec87b'
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}`;

        
        try {
            const response = await fetch(url);
            // console.log(response);
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('404: City not Found')
                }
                console.log('HTTP error');
                console.log(`HTTP Error: ${response.status} - ${response.statusText}`);
                throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`);
                
            }
            const data = await response.json();
            console.log(data);
            return data;
        }
        
        catch(err) {
            console.log(`error fetching weather: ${err.message}`);
            throw err;
        }
    }
}


