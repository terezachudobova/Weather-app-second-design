function formatDate(timestamp) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[timestamp.getDay()];
  
  return `Last updated: ${day} ${formatHours(timestamp)}`;
}
    
function displayWeatherCondition(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#temperature-description").innerHTML = response.data.weather[0].description;
}

function displayIcon(response){
  let largeIcon = document.querySelector("#large-icon-temperature");
  let iconId = response.data.weather[0].icon;
  if (iconId === "01d" || iconId === "01n") {
  largeIcon.setAttribute("class", "fas fa-sun"); 
  } if (iconId === "02d" || iconId === "02n") {
  largeIcon.setAttribute("class", "fas fa-cloud-sun");
  } if (iconId === "03d" || iconId === "03n" || iconId === "04d" || iconId === "04n") {
  largeIcon.setAttribute("class", "fas fa-cloud");
  } if (iconId === "09d" || iconId === "09n") {
  largeIcon.setAttribute("class", "fas fa-cloud-rain");
  } if (iconId === "10d" || iconId === "10n") {
  largeIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } if (iconId === "11d" || iconId === "11n") {
  largeIcon.setAttribute("class", "fas fa-bolt");
} if (iconId === "13d" || iconId === "13n") {
  largeIcon.setAttribute("class", "far fa-snowflake");
} if (iconId === "50d" || iconId === "50n") {
  largeIcon.setAttribute("class", "fas fa-smog");
}
}

function formatHours(timestamp){
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  } 

  return `${hours}:${minutes}`;
}

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];

  let fontAwesomeClass = "fas fa-sun";
  let iconId = forecast.weather[0].icon;
  
  if (iconId === "01d" || iconId === "01n") {
  fontAwesomeClass = "fas fa-sun"; 
  } if (iconId === "02d" || iconId === "02n") {
  fontAwesomeClass = "fas fa-cloud-sun";
  } if (iconId === "03d" || iconId === "03n" || iconId === "04d" || iconId === "04n") {
  fontAwesomeClass = "fas fa-cloud";
  } if (iconId === "09d" || iconId === "09n") {
  fontAwesomeClass = "fas fa-cloud-rain";
  } if (iconId === "10d" || iconId === "10n") {
  fontAwesomeClass = "fas fa-cloud-showers-heavy";
  } if (iconId === "11d" || iconId === "11n") {
  fontAwesomeClass = "fas fa-bolt";
} if (iconId === "13d" || iconId === "13n") {
  fontAwesomeClass = "fas fa-snowflake";
} if (iconId === "50d" || iconId === "50n") {
  fontAwesomeClass = "fas fa-smog";
}

    forecastElement.innerHTML += `
                    <div class="col-2">
                        <div id=forecast-time>
                        ${formatHours(forecast.dt * 1000)}
                        </div>
                        <i class="${fontAwesomeClass}" id="days-icon-temperature"></i>
                        <div id=forecast-temperature>
                        ${Math.round(forecast.main.temp)}°C
                        </div>
                    </div>`
  }
}

function searchCity (city) {
let apiKey = "c8b2b56ed7daf0b94a186eece882db55";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  axios.get(apiUrl).then(displayIcon);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "c8b2b56ed7daf0b94a186eece882db55";
 let latitude = position.coords.latitude;
 let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheit(event) {
  event.preventDefault();
  let degreesFarenheit = document.querySelector("#temperature");
  celsiusButton.classList.remove("active");
  farenheitButton.classList.add("active");
  let temperature = degreesFarenheit.innerHTML;
  temperature = Number(temperature);
  degreesFarenheit.innerHTML = Math.round((celsiusTemperature * 9)/5 + 32);
}
  
function showCelsius(event) {
  event.preventDefault();
  let degreesCelsius = document.querySelector("#temperature");
  farenheitButton.classList.remove("active");
  celsiusButton.classList.add("active");
  degreesCelsius.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let currentTime = document.querySelector("#last-updated-time");
  let now = new Date();
  currentTime.innerHTML = formatDate(now);

let searchForm = document.querySelector("#searching-form");
searchForm.addEventListener("submit", handleSubmit);

let farenheitButton = document.querySelector("#farenheit");
farenheitButton.addEventListener("click", showFarenheit);

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Prague");