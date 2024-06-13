const weather = document.getElementById('weather');
const timeEl = document.getElementById('time');
const temperatureEl = document.getElementById('temprature');
const windSpeedEl = document.getElementById('windSpeed');

const getWeatherData = async function() {
    const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current_weather=true');
    const data = await response.json();
    
    const time = data.current_weather.time;
    const temperature = data.current_weather.temperature;
    const windSpeed = data.current_weather.windspeed;
    const latitude = data.latitude;
    const longitude = data.longitude;

    return [time, temperature, windSpeed, latitude, longitude];
}

async function render() {
    const dataArray = await getWeatherData();

    weather.innerText = `Weather of latitude: ${dataArray[3]} & longitude: ${dataArray[4]}`;
    timeEl.innerText = `Time: ${dataArray[0]}`;
    temperatureEl.innerText = `Temperature: ${dataArray[1]}°C`;
    windSpeedEl.innerText = `Wind Speed: ${dataArray[2]} km/h`;
}

render();
