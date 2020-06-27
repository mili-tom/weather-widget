---
permalink: /src/index.html
---

# weather-widget
Based on user location, this app shows the current weather and 5 day forecast.
<p>
<img src="/src/images/forecast.png">
</p>

## Getting Started
The weather-widget app shows current weather state and forecast for the next 5 days in realtime using OpenWeatherMap API.

### Installing
<li>$ git clone https://github.com/mili-tom/weather-widget.git</li>
<li>$ cd weather-widget</li>
<li>$ code .</li>
<li>run html file in browser</li>

### Features
<li>Prompt user to allow getting their location by using navigator.geolocation</li>
<li>Call OpenWeatherMap API</li> 
<li>Parse and display the current weather conditions and forecasted weather</li>

## API Usage
The weather-widget app uses the OpenWeatherMap API, which is particulary free (all endpoints for this app are free) and provides a way to retrieve live information about current and forecasted weather data. Details of usage:
<li>temperature data is returned in Kelvin by default; in order to be converted, an additional parameter must be entered in the API request (units=metric)</li>
<li>by signing up, every user gets API key which must be included in all requests</li>
<li>for this app are used 2 endpoints: current weather data and 5 day/3 hour forecast</li>

## Coding details
<li>Depending on the time of day when we call the database, it will return us differently structured data (the first day can be today or tomorrow), so an important part of the program is to eliminate data for today.</li>
<li>The forecast is provided in 3 hour blocks for each day, which gives us 8 forecasts for each day. To decide which temperature is the highest/lowest, data should be grouped in max and min arrays for each day.</li>
<li>Weather icon is picked for each day for the same time (noon), in order to be consistent.</li>

## Built With
<li>HTML</li>
<li>CSS</li>
<li>JavaScript</li>
