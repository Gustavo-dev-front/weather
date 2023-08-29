const INPUT = document.querySelector("#city-input");
const SEARCH_BTN = document.querySelector(".search-btn");
const API_KEY = `e6e698a4930e5466790effba84db0728`;

async function getWeatherDetails(coordinates) {
  const { name, lat, lon } = coordinates;
  console.log(name, lat, lon);
  const WEATHER_API_URL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  const uniqueDayForecast = [];

  try {
    const data = await (await fetch(WEATHER_API_URL)).json();
    const forecastArray = data.list.filter((weatherObj) => {
      const date = weatherObj.dt_txt.split(" ")[0];
      if (!uniqueDayForecast.includes(date)) {
        uniqueDayForecast.push(date);
        return weatherObj;
      }
    });

    console.log(forecastArray);
    // Continuar apartir daqui, os dados do clima estão sendo retornados, sendo necessário agora o uso do DOM para mostra-los.
  } catch (error) {
    alert("Um erro ocorreu ao requisitar o clima.");
  }
}

async function getCityCoordinates() {
  const cityName = INPUT.value.trim();
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
