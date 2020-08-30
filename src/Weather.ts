import {OPEN_WEATHER_KEY} from "./credentials";

const weatherKey = OPEN_WEATHER_KEY;

export function getForecast(searchTerm: string) {
  let returnData = "";
  fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm+ '&appid=' + weatherKey)
    .then(response => response.json())
    .then(data => returnData = data)
    .catch(error => console.log("Error fetching data"))
  return returnData;
};
