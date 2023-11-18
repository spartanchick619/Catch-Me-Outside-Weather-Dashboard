//load show forecast function
function showForecast

//jquery ID selectors
  var cityEl = ('city-search');
  var searchBtnEl= ('search-btn')
  var currentWeatherEl = ('#current-weather');
  var cityNameEl = ('city-name');
  var weatherImgEl = ('weather-img');
  var tempEl = ('temperature');
  var windEl = ('wind');
  var humidityEl = ('#umidity');
  var fiveDayEl = ('five-day-section');
  var historyEl = ('history');
  var forecastEl = ('five-forecast');

//weather API 
var APIKey= "3b7f052753b0ae97b7bd2c8e430f87f6";

//function to get weather on specific city entered
function getCurrentWeather(cityName){
    var requestURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&apiid=" + APIKey = "&units=imperial";
    .ajax({
       url: requestURL,
       method: 'GET',
}).then(function (response) {
    console.log(response);
    currentWeatherEl.removeClass("d-none");
    var currentDate = new Date(response.dt * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    cityNameEl.text(response.name + "(" + month + "/" + day + "/" + year + ")");
    var weatherIcon = response.weather[0].icon;
    weatherImgEl.attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
    weatherImgEl.attr("alt", response.weather[0].description);
    tempEl.text("Temperature: " + response.main.temp + " °");
    windEl.text("Wind: " + response.wind.speed + " MPH");
    humidityEl.text("Humidity: " + response.main.humidity + " %");

});

};
