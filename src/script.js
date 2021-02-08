function formatDate(date) {
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
  minutes = `0${minutes}`;
  } 
  return `Last updated: ${day} ${hours}:${minutes}`;
}
    
function displayWeatherCondition(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#temperature-description").innerHTML = response.data.weather[0].description;
}

function searchCity (city) {
let apiKey = "c8b2b56ed7daf0b94a186eece882db55";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=".concat(city, "&appid=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeatherCondition);
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
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFarenheit(event) {
  event.preventDefault();
  let degreesFarenheit = document.querySelector("#temperature");
  let temperature = degreesFarenheit.innerHTML;
  temperature = Number(temperature);
  degreesFarenheit.innerHTML = Math.round((temperature * 9)/5 + 32);
}
  
function showCelsius(event) {
  event.preventDefault();
  let degreesCelsius = document.querySelector("#temperature");
  let temperature = degreesCelsius.innerHTML;
  temperature = Number(temperature);
  degreesCelsius.innerHTML = Math.round((temperature - 32)/ 1.80000);;
}

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