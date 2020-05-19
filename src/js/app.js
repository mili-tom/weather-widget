const APIkey = '8f3863754990ba6491b24790400e0681';

navigator.geolocation.getCurrentPosition(position => {
  homeLat = position.coords.latitude; 
  homeLong = position.coords.longitude;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${homeLat}&lon=${homeLong}&units=metric&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => console.log(json));
});