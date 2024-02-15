// state
let currCity = "London";
let units = "metric";

// Selectors
let city = document.querySelector(".weather__city");
let datetime = document.querySelector(".weather__datetime");
let weather__forecast = document.querySelector('.weather__forecast');
let weather__temperature = document.querySelector(".weather__temperature");
let weather__icon = document.querySelector(".weather__icon");
let weather__minmax = document.querySelector(".weather__minmax")
let weather__realfeel = document.querySelector('.weather__realfeel');
let weather__humidity = document.querySelector('.weather__humidity');
let weather__wind = document.querySelector('.weather__wind');
let weather__pressure = document.querySelector('.weather__pressure');

document.querySelector(".weather__search").addEventListener('submit', e => {
    let search = document.querySelector(".weather__searchform");
    e.preventDefault();
    currCity = search.value;
    getWeather();
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric"
        // get weather forecast 
        getWeather()
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        units = "imperial"
        getWeather()
    }
})

function convertTimeStamp(timezone){
  const date = new Date();
  
  const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      timeZone: 'Asia/Kolkata',
      hour12: true,
  }
  return date.toLocaleString("en-US", options);
}


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
  const API_KEY = 'a5f58887484eeaf99a457bf5951a33bd'

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${API_KEY}&units=${units}`)
      .then(res => res.json())
      .then(data => {
          console.log(data);
          city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
          datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
          weather__forecast.innerHTML = `<p>${getWeatherDescription(data.weather[0].id)}</p>`;
          weather__temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
          weather__icon.innerHTML = `
              <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" />
          `
          weather__minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
          weather__realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
          weather__humidity.innerHTML = `${data.main.humidity}%`
          weather__wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph" : "m/s"}`
          weather__pressure.innerHTML = `${data.main.pressure} hPa`
      })
      .catch(error => {
          console.error('Error fetching weather data:', error);
      });
}

// Function to get descriptive weather information based on weather code
function getWeatherDescription(weatherCode) {
  // Reference: https://openweathermap.org/weather-conditions
  switch (weatherCode) {
      case 200:
      case 201:
      case 202:
      case 210:
      case 211:
      case 212:
      case 221:
          return "Thunderstorm";
      case 230:
      case 231:
      case 232:
          return "Thunderstorm With Drizzle";
      case 300:
      case 301:
      case 302:
      case 310:
      case 311:
      case 312:
      case 313:
      case 314:
      case 321:
          return "Drizzle";
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
          return "Rain";
      case 511:
          return "Freezing rain";
      case 520:
      case 521:
      case 522:
      case 531:
          return "Shower rain";
      case 600:
      case 601:
          return "Snow";
      case 602:
          return "Heavy snow";
      case 611:
      case 612:
      case 613:
      case 615:
      case 616:
      case 620:
      case 621:
      case 622:
          return "Mixed precipitation";
      case 701:
          return "Mist";
      case 711:
          return "Smoke";
      case 721:
          return "Haze";
      case 731:
          return "Dust";
      case 741:
          return "Fog";
      case 751:
          return "Sand";
      case 761:
          return "Dust";
      case 762:
          return "Volcanic ash";
      case 771:
          return "Squalls";
      case 781:
          return "Tornado";
      case 800:
          return "Clear sky";
      case 801:
          return "Few clouds";
      case 802:
          return "Scattered clouds";
      case 803:
          return "Broken clouds";
      case 804:
          return "Overcast clouds";
      default:
          return "Unknown";
  }
}



document.body.addEventListener('load', getWeather())

document.addEventListener("DOMContentLoaded", function() {
  const modeToggleBtn = document.getElementById('mode-toggle');
  const body = document.body;
  const particlesContainer = document.getElementById('particles-js');
  let isDarkMode = false;

  modeToggleBtn.addEventListener('click', function() {
    // Toggle dark mode
    isDarkMode = !isDarkMode;
    body.classList.toggle('dark-mode');
    particlesContainer.classList.toggle('dark-mode');

    // Update particles color based on dark mode
    updateParticlesColor(isDarkMode);
  }); 
})