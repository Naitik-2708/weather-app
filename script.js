// Weather App JavaScript
class WeatherApp {
    constructor() {
        this.apiKey = '3ab75ff2ff418db54d82949c7d1d345a'; // You'll need to get a free API key from OpenWeatherMap
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
        
        this.cityInput = document.getElementById('city-input');
        this.searchBtn = document.getElementById('search-btn');
        this.weatherInfo = document.getElementById('weather-info');
        this.weatherDetails = document.getElementById('weather-details');
        this.loading = document.getElementById('loading');
        this.error = document.getElementById('error');
        
        this.bindEvents();
        this.loadLastSearchedCity();
    }
    
    bindEvents() {
        this.searchBtn.addEventListener('click', () => this.searchWeather());
        this.cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchWeather();
            }
        });
    }
    
    async searchWeather() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError('Please enter a city name');
            return;
        }
        
        this.showLoading();
        this.saveLastSearchedCity(city);
        
        try {
            const weatherData = await this.getWeatherData(city);
            const forecastData = await this.getForecastData(city);
            
            this.displayWeather(weatherData, forecastData);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.showError('City not found or network error. Please try again.');
        }
    }
    
    async getWeatherData(city) {
        const url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    async getForecastData(city) {
        const url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    }
    
    displayWeather(weatherData, forecastData) {
        this.hideAll();
        this.weatherDetails.style.display = 'block';
        
        // Update current weather
        this.updateCurrentWeather(weatherData);
        
        // Update weather stats
        this.updateWeatherStats(weatherData);
        
        // Update forecast
        this.updateForecast(forecastData);
    }
    
    updateCurrentWeather(data) {
        const cityName = document.getElementById('city-name');
        const dateTime = document.getElementById('date-time');
        const temperature = document.getElementById('temperature');
        const weatherDescription = document.getElementById('weather-description');
        const weatherIcon = document.getElementById('weather-icon');
        
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        dateTime.textContent = this.formatDateTime(data.dt);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }
    
    updateWeatherStats(data) {
        const feelsLike = document.getElementById('feels-like');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const visibility = document.getElementById('visibility');
        
        feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`; // Convert m/s to km/h
        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    }
    
    updateForecast(data) {
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        
        // Get daily forecasts (every 24 hours)
        const dailyForecasts = this.getDailyForecasts(data.list);
        
        dailyForecasts.forEach(forecast => {
            const forecastItem = this.createForecastItem(forecast);
            forecastContainer.appendChild(forecastItem);
        });
    }
    
    getDailyForecasts(forecastList) {
        const dailyForecasts = [];
        const today = new Date().toDateString();
        
        forecastList.forEach(forecast => {
            const forecastDate = new Date(forecast.dt * 1000).toDateString();
            if (forecastDate !== today && dailyForecasts.length < 5) {
                const existingForecast = dailyForecasts.find(f => 
                    new Date(f.dt * 1000).toDateString() === forecastDate
                );
                
                if (!existingForecast) {
                    dailyForecasts.push(forecast);
                }
            }
        });
        
        return dailyForecasts;
    }
    
    createForecastItem(forecast) {
        const item = document.createElement('div');
        item.className = 'forecast-item';
        
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;
        const icon = forecast.weather[0].icon;
        
        item.innerHTML = `
            <h4>${dayName}</h4>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
            <div class="temp">${temp}°C</div>
            <div class="description">${description}</div>
        `;
        
        return item;
    }
    
    formatDateTime(timestamp) {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    showLoading() {
        this.hideAll();
        this.loading.style.display = 'block';
    }
    
    showError(message) {
        this.hideAll();
        this.error.style.display = 'block';
        document.getElementById('error-message').textContent = message;
    }
    
    hideAll() {
        this.weatherInfo.style.display = 'none';
        this.weatherDetails.style.display = 'none';
        this.loading.style.display = 'none';
        this.error.style.display = 'none';
    }
    
    saveLastSearchedCity(city) {
        localStorage.setItem('lastSearchedCity', city);
    }
    
    loadLastSearchedCity() {
        const lastCity = localStorage.getItem('lastSearchedCity');
        if (lastCity) {
            this.cityInput.value = lastCity;
        }
    }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const weatherApp = new WeatherApp();
    
    // Add some helpful instructions
    console.log(`
    🌤️ Weather App Setup Instructions:
    
    1. Get a free API key from OpenWeatherMap:
       - Go to https://openweathermap.org/
       - Sign up for a free account
       - Get your API key from your account dashboard
    
    2. Replace 'YOUR_API_KEY' in script.js with your actual API key
    
    3. Open index.html in your browser to use the app!
    
    Features:
    ✅ Current weather with temperature, description, and icon
    ✅ Feels like temperature, humidity, wind speed, and visibility
    ✅ 5-day weather forecast
    ✅ Responsive design for mobile and desktop
    ✅ Search by city name
    ✅ Beautiful modern UI with animations
    ✅ Error handling and loading states
    ✅ Remembers last searched city
    `);
}); 