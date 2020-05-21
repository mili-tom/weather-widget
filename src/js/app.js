const APIkey = '8f3863754990ba6491b24790400e0681';
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

navigator.geolocation.getCurrentPosition(position => {
  homeLat = position.coords.latitude; 
  homeLon = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${homeLat}&lon=${homeLon}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(currentData => {
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${homeLat}&lon=${homeLon}&units=metric&appid=${APIkey}`)
        .then(response => response.json())
        .then(forecastData => {
          displayCurrentWeather(currentData);
          groupForecastData(forecastData.list);               
        });      
    });   
});

//source for HTML displaying Celsius degree sign: https://www.w3schools.com/charsets/ref_utf_letterlike.asp
function displayCurrentWeather(query) {
  const currentElem = document.querySelector('.current-conditions');
  currentElem.insertAdjacentHTML('beforeend', 
    `<img src="http://openweathermap.org/img/wn/${query.weather[0].icon}@2x.png">
    <div class="current">
      <div class="temp">${Math.round(query.main.temp)}&#8451;</div>
      <div class="condition">${query.weather[0].description}</div>
    </div>`
  );
}

function groupForecastData(listOfDays) {
  const today = nameCurrentDay();  
  const objectOfDays = {};

  for (let i = 0; i < listOfDays.length; i++) {  
    let forecastDay = nameForecastDays((listOfDays[i].dt_txt).slice(0, 10));          
    if (forecastDay !== today) {
      if (objectOfDays[forecastDay] === undefined) {
        objectOfDays[forecastDay] = [listOfDays[i]];
      } else {
        objectOfDays[forecastDay].push(listOfDays[i]);
      }
    }            
  }
  
  extractForecastData(objectOfDays);
}

function extractForecastData(groupedData) {
  Object.keys(groupedData).forEach(function(day) {    
    const noonValue = [];
    const minTemp = [];
    const maxTemp = [];

    groupedData[day].forEach(value => {     
      if (value.dt_txt.includes("12:00:00")) {
        noonValue.push(value);
      }

      minTemp.push(value.main.temp_min);
      maxTemp.push(value.main.temp_max);        
    })

    displayForecast(day, noonValue, Math.round(Math.min(...minTemp)), Math.round(Math.max(...maxTemp))); //source for Math.min() and Math.max(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min  
  });
}

function displayForecast(day, noon, min, max) {
  const forecastElem = document.querySelector('.forecast');  
  forecastElem.insertAdjacentHTML('beforeend', 
    `<div class="day">
      <h3>${day}</h3>
      <img src="http://openweathermap.org/img/wn/${noon[0].weather[0].icon}@2x.png" />
      <div class="description">${noon[0].weather[0].description}</div>
      <div class="temp"> 
        <span class="high">${max}&#8451;</span>/<span class="low">${min}&#8451;</span>
      </div>
    </div>`
  );
}

function nameCurrentDay() {  
  const currentDayNum = new Date().getDay();
  const currentDay = weekDays[currentDayNum - 1];

  return currentDay;
}

function nameForecastDays(date) {     
  const forecastDayNum = new Date(date).getDay(); 
  const forecastDay = weekDays[forecastDayNum];

  return forecastDay;
}
