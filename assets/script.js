//load show forecast function
function showForecast() {

var historyEl = $('#history');
var forecastEl = $('#five-forecast');

//weather API 
var APIKey= "3b7f052753b0ae97b7bd2c8e430f87f6";

//function to get weather on specific city entered
function getCurrentWeather(cityName){
    var requestURL= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: requestURL,
        method: 'GET',
}).then(function (response) {
    console.log(response);
    console.log(response.main.temp);
    $("#current-weather").removeClass("d-none");
    var currentDate = new Date(response.dt * 1000);
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    $("#city-name").text(response.name + " (" + month + "/" + day + "/" + year + ")");
    var weatherIcon = response.weather[0].icon;
    $("#weather-img").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
    $("#weather-img").attr("alt", response.weather[0].description);
    $("#temperature").text("Temperature: " + response.main.temp + " °");
    $("#wind").text("Wind: " + response.wind.speed + " MPH");
    $("#humidity").text("Humidity: " + response.main.humidity + " %");

});

};

//function to retrieve 5 day forecast
function getForecast(cityName){
    forecastEl.text('');
    var requestURL= "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey + "&units=imperial";
    $.ajax({
        url: requestURL,
        method: 'GET',
    }).then(function (response) {
        console.log(response);
        $("#five-Day-section").removeClass("d-none");
        for (i = 6; i < response.list.length; i += 8) {
            var forecastDate = new Date(response.list[i].dt_txt);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecastDate.getFullYear();
            console.log(forecastDate);
            var forecastIcon = response.list[i].weather[0].icon;
            var forecastColumnEl = $("<div>").addClass("col-lg-2 m-3");
            var forecastCardEl = $("<div>").addClass("card bg-info-subtle text-center");
            var forecastCardBodyEl = $("<div>").addClass("card-body");
            var cardDateEl = $("<p>").addClass("fw-bold").text(forecastMonth + "/" + forecastDay + "/" + forecastYear);
            var cardImgEl = $("<img>");
            cardImgEl.attr("src", "https://openweathermap.org/img/wn/" + forecastIcon + ".png");
            cardImgEl.attr("alt", response.list[i].weather[0].description);
            var cardTempEl = $("<p>").text("Temperature: " + response.list[i].main.temp + " °");
            var cardWindEl = $("<p>").text("Wind: " + response.list[i].wind.speed + " MPH");
            var cardHumidityEl = $("<p>").text("Humidity: " + response.list[i].main.humidity + " %");
            forecastCardBodyEl.append(cardDateEl);
            forecastCardBodyEl.append(cardImgEl);
            forecastCardBodyEl.append(cardTempEl);
            forecastCardBodyEl.append(cardWindEl);
            forecastCardBodyEl.append(cardHumidityEl);
            forecastCardEl.append(forecastCardBodyEl);
            forecastColumnEl.append(forecastCardEl);
            forecastEl.append(forecastColumnEl);
        };
    }); 
};

//function for search button
$("#search-btn").on("click", function () {
    var cityName = $("#city-search").val();
    getCurrentWeather(cityName);
    getForecast(cityName);
    searchHistory.push(cityName);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderHistory();
});

//local storage and search history variable
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log("search history: ", searchHistory);

//function for local storage and history
function renderHistory(){
    historyEl.text("");
        for (i = 0; i < searchHistory.length; i ++ ) {
        var historyBtn = $("<button>");
        historyBtn.text(searchHistory[i]);
        historyBtn.attr("data-location", searchHistory[i]);
        historyBtn.attr("class", "btn btn-info my-2 d-block")
        historyBtn.on("click", function () {
            getCurrentWeather($(this).data("location"));
            getForecast($(this).data("location"));
            console.log($(this).data("location"));
        });
        $(historyEl).append(historyBtn);
    };
};

renderHistory();
};

showForecast();
