const INPUT = document.querySelector("#city-input");
const SEARCH_BTN = document.querySelector(".search-btn");

async function getWeatherData() {
  INPUT.value = INPUT.value.trim();
  if (INPUT.value.length === 0) return;
  const API_KEY = "e6e698a4930e5466790effba84db0728";
  const API_URL = `http://api.openweathermap.org/geo/1.0/direct?q=${INPUT}&limit=1&appid=${API_KEY}`;

  try {
    const data = await (await fetch(API_URL)).json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

SEARCH_BTN.addEventListener("click", getWeatherData);
