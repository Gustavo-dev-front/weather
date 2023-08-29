const INPUT = document.querySelector("#city-input");
const SEARCH_BTN = document.querySelector(".search-btn");
const API_KEY = `e6e698a4930e5466790effba84db0728`;
const FORECAST_LIST = document.querySelector(".day-forecast .list");

function createForecastCard(object) {
  const date = object.dt_txt.split(" ")[0];
  const icon = object.weather[0].icon;
  const temp = object.main.temp;
  const wind = object.wind.speed;
  const humidity = object.main.humidity;
  const card = `<li class="card">
                  <span class="date">(${date})</span>
                  <img src="https://openweathermap.org/img/wn//${icon}@4x.png" alt="weather-image">
                  <p class="weather-info temparature">Temp: <span>${temp}°C</span></p>
                  <p class="weather-info wind">Vento: <span>${wind} M/S</span></p>
                  <p class="weather-info humidity">Umidade: <span>${humidity}%</span></p>
                </li>`;
  FORECAST_LIST.innerHTML += card;
}

async function getWeatherDetails(coordinates) {
  FORECAST_LIST.innerHTML = "";
  const { name, lat, lon } = coordinates;
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${API_KEY}`;

  const uniqueDayForecast = [];

  try {
    const data = await (await fetch(WEATHER_API_URL)).json();
    const forecastArray = data.list.filter((weatherObj) => {
      const date = weatherObj.dt_txt.split(" ")[0];
      if (!uniqueDayForecast.includes(date)) {
        uniqueDayForecast.push(date);
        createForecastCard(weatherObj);
        return weatherObj;
      }
    });
  } catch (error) {
    alert("Um erro ocorreu ao requisitar o clima.");
  }
}

async function getCityCoordinates() {
  const cityName = INPUT.value.trim();
  INPUT.value = "";
  if (!cityName) return;

  const GEOCODING_API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`;

  try {
    const data = await (await fetch(GEOCODING_API_URL)).json();

    if (!data.length)
      return alert(`Não foi possível encontrar coordenadas para ${cityName}`);

    getWeatherDetails(data[0]);
  } catch (error) {
    alert("Um erro ocorreu ao requisitar as coordenadas da cidade.");
  }
}

SEARCH_BTN.addEventListener("click", getCityCoordinates);
INPUT.addEventListener("keyup", (e) => {
  if (e.key === "Enter") getCityCoordinates();
});
