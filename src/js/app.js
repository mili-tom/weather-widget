const APIkey = '8f3863754990ba6491b24790400e0681';

navigator.geolocation.getCurrentPosition(position => {
  homeLat = position.coords.latitude; 
  homeLong = position.coords.longitude;

  console.log(homeLat, homeLong);
});