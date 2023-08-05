// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=5052c684ba4f50362a350aed2a8fcb87&units=metric
const apiKey = "5052c684ba4f50362a350aed2a8fcb87";
let button = document.getElementById("btn");
let search = document.getElementById("search-input");
let cardContainer = document.getElementById("card-container");

async function getSearchResults(searchString) {
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchString}&appid=${apiKey}&units=metric`;
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();
    fetchData(result);
    console.log(result);
  } catch (error) {
    alert("Enter a valid city name");
  }
}

function sunriseValue(value) {
  let d = new Date(value * 1000);
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let time = `${hr}H:${min}M:${sec}S`;
  return time;
}

function sunsetValue(value) {
  let d = new Date(value * 1000);
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let time = `${hr}H:${min}M:${sec}S`;
  return time;
}

function fetchData(data) {
  let epochsunrise = sunriseValue(Number(data.sys.sunrise));
  let epochsunset = sunsetValue(Number(data.sys.sunset));
  // console.log(epochsunrise);

  let card = document.createElement("div");
  card.className = "card";
  card.innerHTML = ` <div class="temp">
    <span class="curr-temp">${Math.floor(data.main.temp)}°</span>
    <img src="https://openweathermap.org/img/wn/${
      data.weather[0].icon
    }@2x.png" alt="${data.weather[0].main}" class="icon" />
  </div>
  <div class="block-2">
    <div class="block-2-1">
      <span class="high-temp">H: ${data.main.temp_max}°</span>
      <span class="low-temp">L: ${data.main.temp_min}°</span>
      <div class="city-block">
        <h3 class="city">${data.name},</h3>
        <h3 class="country"> ${data.sys.country}</h3>
      </div>
    </div>
    <div class="block-2-2">
      <span class="weather-status">${data.weather[0].description.toUpperCase()}</span>
      <span class="humi">Humidity: ${data.main.humidity}%</span>
      <span class="pressure">Pressure: ${data.main.pressure}(Pa)</span>
    </div>
  </div>
  <div class="block-3">
    <div class="block-3-1">
      <span class="country-code">CountryCode: ${data.id}</span>
      <span class="sunrise">Sunrise: ${epochsunrise}</span>
      <span class="sunset">Sunset: ${epochsunset}</span>
    </div>
    <div class="block-3-2">
      <span class="wind-sp">Wind: ${data.wind.speed}Km/h</span>
      <span class="cl-per">Cloud: ${data.clouds.all}%</span>
    </div>
  </div>`;

  cardContainer.appendChild(card);
}

// search.addEventListener("input", () => {
//   let arrFilter = arr.filter((item) => {
//     item.name.toLowerCase().includes(search.value.toLowerCase().trim());
//   });
//   console.log(arrFilter);
//   fetchData(arrFilter);
// });

button.addEventListener("click", () => {
  let city = search.value;
  getSearchResults(city);
  search.value = "";
});
