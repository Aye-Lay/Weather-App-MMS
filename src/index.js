function getformatDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thusday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hour}:${minute}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForcast(response) {
  let forcast = response.data.daily;
  let forcastElement = document.querySelector("#forcast");
  let forcastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 7) {
      forcastHTML =
        forcastHTML +
        `<div class="col">
                <div class="forecast-day">${formatDay(forcastDay.time)}</div>
                <div class="forecast-temperature"><span class="forecast-temperature-max">${Math.round(
                  forcastDay.temperature.maximum
                )}°</span><span class="forecast-temperature-min"> ${Math.round(
          forcastDay.temperature.minimum
        )}°</span></div>
  
                <div class="forecast-icon">
                 <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                   forcastDay.condition.icon
                 }.png" alt="shower-rain-day.png">
                </div>
              </div>

              
        `;
    }
  });

  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coordinates) {
  let apiKey = "ob09c1d70a7b42abct8580f52909b5a3";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#date").innerHTML = getformatDate(
    response.data.time * 1000
  );
  getForcast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "ob09c1d70a7b42abct8580f52909b5a3";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}
document.querySelector("#search-form").addEventListener("submit", searchForm);

searchCity("Hpa-an");
