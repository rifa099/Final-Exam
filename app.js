const apiKey = 'd93de1abad35647980264a8343089c6f';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

function searchWeather() {
  const searchInput = document.getElementById('searchInput').value;

  fetch(`${baseUrl}?q=${searchInput}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeather(data) {
  const location = document.getElementById('location');
  const temperature = document.getElementById('temperature');
  const weatherDescription = document.getElementById('weatherDescription');
  const weatherIcon = document.getElementById('weatherIcon');
  const weatherInfo = document.getElementById('weatherInfo');

  location.textContent = data.name + ', ' + data.sys.country;
  temperature.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
  weatherDescription.textContent = data.weather[0].description;

  // Set weather image based on weather conditions
  const weatherCode = data.weather[0].id;
  const weatherImage = getWeatherImage(weatherCode);
  weatherIcon.src = weatherImage;

  weatherInfo.classList.remove('hidden');
}

function getWeatherImage(weatherCode) {
  const imageMapping = {
    '01': 'sunny',
    '02': 'cloudy',
    '03': 'cloudy',
    '04': 'cloudy',
    '09': 'rainy',
    '10': 'rainy',
    '11': 'stormy',
    '13': 'snowy',
    '50': 'misty',
  };

  const prefix = 'path/to/your/weather/images/';
  const defaultImage = `${prefix}unknown.png`;

  const codePrefix = String(weatherCode).charAt(0);
  const imageName = imageMapping[codePrefix] || 'unknown';

  return `${prefix}${imageName}.png` || defaultImage;
}
