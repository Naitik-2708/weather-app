# 🌤️ Weather App

A beautiful, modern weather application built with HTML, CSS, and JavaScript that provides real-time weather information for any city in the world.

## ✨ Features

- **Current Weather**: Real-time temperature, weather description, and weather icons
- **Detailed Stats**: Feels like temperature, humidity, wind speed, and visibility
- **5-Day Forecast**: Extended weather forecast with daily predictions
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient backgrounds, smooth animations, and glass-morphism effects
- **Search Functionality**: Search for any city by name
- **Error Handling**: Graceful error handling with user-friendly messages
- **Local Storage**: Remembers your last searched city
- **Loading States**: Smooth loading animations while fetching data

## 🚀 Quick Start

### 1. Get API Key
1. Go to [OpenWeatherMap](https://openweathermap.org/)
2. Sign up for a free account
3. Navigate to your account dashboard
4. Copy your API key

### 2. Setup the App
1. Open `script.js` in your code editor
2. Replace `'YOUR_API_KEY'` on line 4 with your actual API key:
   ```javascript
   this.apiKey = 'your_actual_api_key_here';
   ```

### 3. Run the App
1. Open `index.html` in your web browser
2. Enter a city name and press Enter or click the search button
3. Enjoy your weather information!

## 📁 File Structure

```
weather.app/
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🎨 Design Features

- **Glass-morphism Effect**: Semi-transparent backgrounds with blur effects
- **Gradient Backgrounds**: Beautiful color gradients throughout the app
- **Smooth Animations**: Hover effects, loading spinners, and transitions
- **Responsive Grid**: CSS Grid and Flexbox for perfect layouts
- **Modern Typography**: Poppins font family for clean, readable text
- **Icon Integration**: Font Awesome icons for enhanced visual appeal

## 🔧 Technical Details

### API Used
- **OpenWeatherMap API**: Free weather data API
- **Endpoints Used**:
  - Current weather: `/weather`
  - 5-day forecast: `/forecast`

### Technologies
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **Vanilla JavaScript**: ES6+ features, async/await, classes
- **Local Storage**: Browser storage for user preferences

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🛠️ Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
/* Main gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Weather card gradient */
background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Adding New Weather Data
The app can easily be extended to show additional weather information by modifying the `updateWeatherStats()` method in `script.js`.

## 📱 Mobile Responsive

The app is fully responsive and includes:
- Mobile-first design approach
- Touch-friendly interface
- Optimized layouts for different screen sizes
- Responsive grid systems

## 🔒 Privacy & Security

- No user data is stored on external servers
- API calls are made directly from the browser
- Local storage is used only for user preferences
- No tracking or analytics

## 🐛 Troubleshooting

### Common Issues

1. **"City not found" error**
   - Check the city name spelling
   - Try using the full city name (e.g., "New York" instead of "NYC")

2. **API key not working**
   - Verify your API key is correct
   - Check if your OpenWeatherMap account is activated
   - Wait a few hours after registration (API key activation can take time)

3. **No weather data loading**
   - Check your internet connection
   - Verify the API key is properly set in `script.js`
   - Check browser console for error messages

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## 📞 Support

If you need help with the weather app:
1. Check the troubleshooting section above
2. Review the browser console for error messages
3. Verify your API key setup
4. Test with different city names

---

**Enjoy your weather app! ☀️🌧️❄️** 