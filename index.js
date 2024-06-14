const weather = document.getElementById('weather');
const timeEl = document.getElementById('time');
const temperatureEl = document.getElementById('temprature');
const windSpeedEl = document.getElementById('windSpeed');
const isDayEl = document.getElementById('isDay')
const latitudeEl = document.getElementById('latitude')
const longitudeEl = document.getElementById('longitude')
const submitBtnEl = document.getElementById('submitBtn')

const getWeatherData = async function() {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitudeEl.value}&longitude=${longitudeEl.value}&current=temperature_2m,is_day,rain,wind_speed_10m`);
    const data = await response.json();
    console.log(data)
    const time = data.current.time;
    const temperature = data.current.temperature_2m;
    const windSpeed = data.current.wind_speed_10m;
    const isDay = data.current.is_day;
    const latitude = data.latitude;
    const longitude = data.longitude;

    return [time, temperature, windSpeed, isDay , latitude, longitude];
}

async function render() {
    const dataArray = await getWeatherData();

    weather.innerText = `Weather of latitude: ${dataArray[4]} & longitude: ${dataArray[5]}`;
    timeEl.innerText = `Time: ${dataArray[0]}`;
    temperatureEl.innerText = `Temperature: ${dataArray[1]}°C`;
    windSpeedEl.innerText = `Wind Speed: ${dataArray[2]} km/h`;

    if(dataArray[3] === 1)
    {
        isDayEl.innerText = `Is day : Yes`
        document.body.style.backgroundImage = `url("day.jpg")`
        weather.style.color = "purple"
        timeEl.style.color = "purple"
        temperatureEl.style.color = "purple"
        windSpeedEl.style.color = "purple"
        isDayEl.style.color = "purple"
    }
    else if(dataArray[3] === 0)
    {
         isDayEl.innerText = `Is day : No`
        document.body.style.backgroundImage = `url("night.jpg")`
        weather.style.color = "white"
        timeEl.style.color = "white"
        temperatureEl.style.color = "white"
        windSpeedEl.style.color = "white"
        isDayEl.style.color = "white"
    }
}

render();

submitBtnEl.addEventListener('click',render)

