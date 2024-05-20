document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([39.91, 116.41], 13);  

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const locationInput = document.getElementById('location');
    const getWeatherBtn = document.getElementById('getWeather');
    const weatherResult = document.getElementById('weatherResult');
    const apiKey = '5d62ae24a1894f8fae023706242005 ';  // Replace

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value;
        fetchWeatherData(location);
    });

    async function fetchWeatherData(location) {
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
            if (!response.ok) throw new Error('Weather data not available');
            const data = await response.json();
            displayWeatherData(data);
            updateMap(data.location.lat, data.location.lon);
        } catch (error) {
            weatherResult.innerHTML = `<p>Error fetching weather data. Please try again.</p>`;
        }
    }

    function displayWeatherData(data) {
        weatherResult.innerHTML = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p>Temperature: ${data.current.temp_c}°C</p>
            <p>Condition: ${data.current.condition.text}</p>
            <img src="${data.current.condition.icon}" alt="weather icon">
            <p>Humidity: ${data.current.humidity}%</p>
            <p>Wind: ${data.current.wind_kph} kph</p>
        `;
    }

    function updateMap(lat, lon) {
        map.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(map);
    }
});