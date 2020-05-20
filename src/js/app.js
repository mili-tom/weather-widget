const APIkey = '8f3863754990ba6491b24790400e0681';

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
          //displayForecast(forecastData);
          console.log(currentData);
          console.log(forecastData.list);
        });      
    });   
});

//https://www.w3schools.com/charsets/ref_utf_letterlike.asp (for Celsius degree)
function displayCurrentWeather(query) {
  const currentElem = document.querySelector('.current-conditions');
  currentElem.insertAdjacentHTML('beforeend', 
        `<img src="http://openweathermap.org/img/wn/${query.weather[0].icon}@2x.png">
        <div class="current">
          <div class="temp">${Math.round(query.main.temp)}&#8451;</div>
          <div class="condition">${query.weather[0].description}</div>
        </div>
      </div>`
  )
}