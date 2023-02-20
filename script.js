var apikey = "f717cea7b2a9ffb9af9f5b9aaa74c1b9";
var cityInputEl = document.getElementById("city-input");
var searchbtnEl = document.getElementById("search-button");
var cityList = document.querySelector(".city-list");
var weatherInfoLocal = [];
localStorage.getItem("weather-info-local");
var citySearched, citybtnEl;
var latitudeData, longitudeData;
var limit = 5;

var citySelected = document.getElementById("city-selected");
var todayDate = document.getElementById("today-date");
var cityTemp = document.getElementById("temp");
var cityWind = document.getElementById("wind");
var cityHumidity = document.getElementById("humidity");

var fivedayscity = document.querySelectorAll(".weather-card-city");
var fivedaysTemp = document.querySelectorAll(".weather-card-temp");
var fivedaysWind = document.querySelectorAll(".weather-card-wind");
var fivedaysHumidity = document.querySelectorAll(".weather-card-humidity");

localStorage.clear();

searchbtnEl.addEventListener("click", function () {
  citySearched = cityInputEl.value;
  var promptMsg = document.createElement("p");
  if (citySearched === "") {
    promptMsg.textContent = "Enter a name of the city";
    cityList.append(promptMsg);
  } else {
    if (promptMsg.textContent !== "") {
      promptMsg.remove();
    }
    citybtnEl = document.createElement("button");
    weatherInfoLocal.push(citySearched)
    citybtnEl.textContent = citySearched;
    cityList.append(citybtnEl);
    cityInputEl.value = "";
    fetchgeodata(citySearched, limit, apikey);
    localStorage.setItem(
      "weather-info-local",
      JSON.stringify(weatherInfoLocal)
    );
  }
});

function fetchgeodata(city, limit, apikey) {
  var georequestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apikey}`;
  fetch(georequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      latitudeData = data[0].lat;
      longitudeData = data[0].lon;
  fetchweatherdata(latitudeData, longitudeData, apikey);
    });
}

function fetchweatherdata(latitude, longitude, apikey) {
  var weatherrequestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`;
  fetch(weatherrequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    
      console.log(data);
      
      citySelected.textContent = data.city.name;
      todayDate.textContent = dayjs(data.list[0].dt_txt).format("MM/DD/YYYY");
      cityTemp.textContent = data.list[0].main.temp;
      cityWind.textContent = data.list[0].wind.speed + " MPH";
      cityHumidity.textContent = data.list[0].main.humidity + "%";
      
      var j = 0;
  
      for (var i = 7; i < 40; i = i + 8) {
        fivedayscity[j].textContent = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY");
        fivedaysTemp[j].textContent = data.list[i].main.temp;
        fivedaysWind[j].textContent = data.list[i].wind.speed + " MPH";
        fivedaysHumidity[j].textContent = data.list[i].main.humidity + "%";
        j = j + 1;
      }
    });
}