const weather = document.getElementById('weather');
const timeEl = document.getElementById('time');
const temperatureEl = document.getElementById('temprature');
const windSpeedEl = document.getElementById('windSpeed');
const isDayEl = document.getElementById('isDay')
const latitudeEl = document.getElementById('latitude')
const longitudeEl = document.getElementById('longitude')
const submitBtnEl = document.getElementById('submitBtn')
const isRainEl = document.getElementById('isRain')
const dayOrNight = document.getElementById('day')
const rainOrNot = document.getElementById('rain')
const city = document.getElementById('cityName')
const cityname = document.getElementById('city')
const author = document.getElementById('author')

const getWeatherData = async function() {
    const response1 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=Frauenplan+1%2C+99423+Weimar%2C+${city.value}&key=73e845011d724cdead97f598ef15198d`)
    const data1 = await response1.json();
    console.log(data1)
    const geometry = data1.results[0].geometry;
    const latitude1 = geometry.lat;
    const longitude1 = geometry.lng;
    const city1 = data1.results[0].formatted
    cityname.innerText = `City :${city1}`
    console.log(latitude1)
    console.log(longitude1)

    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude1}&longitude=${longitude1}&current=temperature_2m,is_day,rain,wind_speed_10m`);
    const data = await response.json();
    console.log(data)
    const time = data.current.time;
    const temperature = data.current.temperature_2m;
    const windSpeed = data.current.wind_speed_10m;
    const isDay = data.current.is_day;
    const latitude = data.latitude;
    const longitude = data.longitude;
    const isRain = data.current.rain;

    return [time, temperature, windSpeed, isDay , latitude, longitude,isRain];
}

async function render() {
    const dataArray = await getWeatherData();

    weather.innerText = `Weather of latitude: ${dataArray[4]} & longitude: ${dataArray[5]}`;
    timeEl.innerText = `Time: ${dataArray[0]}`;
    temperatureEl.innerText = `Temperature: ${dataArray[1]}°C`;
    windSpeedEl.innerText = `Wind Speed: ${dataArray[2]} km/h`;

    if(dataArray[3] === 1)
    {
        isDayEl.innerText = `Day`
        document.body.style.backgroundImage = `url("day.jpg")`
        weather.style.color = "black"
        cityname.style.color = "black"
        author.style.color = "black"
        timeEl.style.color = "black"
        temperatureEl.style.color = "black"
        windSpeedEl.style.color = "black"
        isDayEl.style.color = "black"
        dayOrNight.src = "day1.png"
    }
    else if(dataArray[3] === 0)
    {
         isDayEl.innerText = `Night`
        document.body.style.backgroundImage = `url("night.jpg")`
        weather.style.color = "black"
        cityname.style.color = "black"
        author.style.color = "black"
        timeEl.style.color = "black"
        temperatureEl.style.color = "black"
        windSpeedEl.style.color = "black"
        isDayEl.style.color = "black"
        dayOrNight.src = "night1.png"
    }
    else
        alert('error!!!')
    if(dataArray[6] === 1)
    {
        isRainEl.innerText = `Rain`
        rainOrNot.src = "rain.png"
    }
    else if(dataArray[6] === 0)
    {
        isRainEl.innerText = `No rain`
        rainOrNot.src = "norain.png"
    }
    else
        alert('error!!!')
}

submitBtnEl.addEventListener('click',render)
