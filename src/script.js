let now = new Date();

let h3 = document.querySelector("h3");

let minutes = now.getMinutes();
let hours = now.getHours();
let date = now.getDate();
let year = now.getFullYear();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[now.getMonth()];

h3.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function searchWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  if (searchInput.value !== "") {
    h1.innerHTML = `${searchInput.value}`;
    let apiKey = "619ae46dd09153325c06122c8c0b4325";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&units=metric&appid=619ae46dd09153325c06122c8c0b4325`;
    axios.get(apiUrl).then(showTemperature);
  } else {
    searchInput.value = null;
    alert("Type a city");
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchWeather);

function showTemperature(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let ppt = response.data.weather[0].main;
  let pptElement = document.querySelector("#ppt");
  pptElement.innerHTML = `${ppt}`;
  let temperature = Math.round(response.data.main.temp);
  let humid = Math.round(response.data.main.humidity);
  let humidElement = document.querySelector("#humid");
  humidElement.innerHTML = `${humid}%`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}km/h`;

  let h3 = document.querySelector("#temperature");
  h3.innerHTML = temperature;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "619ae46dd09153325c06122c8c0b4325";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=619ae46dd09153325c06122c8c0b4325&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocation);
