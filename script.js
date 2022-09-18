const ApiKey = 'ca1fa3b7dc218417eb554dd06ca8fcf2';

let searchBtn = document.querySelector('#send');

searchBtn.addEventListener('click', handlSearch);

function handlSearch() {
  let city = document.querySelector('input').value;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`;

  getWeatherData(url, city);
}

getWeatherData(
  `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${ApiKey}`
);

async function getWeatherData(url, cityName = 'tokyo') {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const categorizedData = processData(data);
    weatherIcon(categorizedData[0][0].icon);
    temps(
      categorizedData[1].temp_max,
      categorizedData[1].temp_min,
      categorizedData[1].temp
    );
    document.querySelector('input').placeholder = cityName;
    document.querySelector('input').value = '';
  } catch (error) {
    alert(error);
  }
}

const processData = (data) => {
  let allData = [];

  allData.push(data.weather);
  allData.push(data.main);

  return allData;
};

function weatherIcon(id) {
  let imgTag = document.querySelector('#weather-icon');
  imgTag.src = `http://openweathermap.org/img/wn/${id}@2x.png`;
}

function temps(max, min, cor) {
  let maxTemp = document.querySelector('#max-temp');
  let minTemp = document.querySelector('#min-temp');
  let temp = document.querySelector('#temp');

  console.log(max, min, cor);
  maxTemp.innerText = `${Math.round(max - 273.15)}°C`;
  minTemp.innerText = `${Math.round(min - 273.15)}°C`;
  temp.innerText = `${Math.round(cor - 273.15)}°C`;
}
