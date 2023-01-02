let weatherUrl;
let locationUrl;
let jsonData = [];
let locationData = [];
const status = document.getElementById("status");
const weathericon = document.getElementById("weathericon");

function buildAPIRequest(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    // Using OpenMeteo means accepting that the data is taken every hour, instead of being real-time. Currently considering switching to NWS when their systems become stable
    weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=5ecabb000a89eb6a1a32b5113457f4a0&units=imperial";
    locationUrl = "https://www.mapquestapi.com/geocoding/v1/reverse?key=VGmsY3ZpSNBA8mWlqtnlczWYmlgm1RuM&location=" + latitude + "," + longitude;
    weatherAPIRequest();
}

function weatherAPIRequest() {
    // For each url built in buildAPIRequest(), fetch the website, convert the data to json format so that it is usable, and push the json data to the specific array to be used later
    fetch(weatherUrl).then(response => response.json()).then(json => {
        console.log(weatherUrl)
        jsonData.push(json);
        displayTempData();
    })
    fetch(locationUrl).then(response => response.json()).then(json => {
        locationData.push(json);
        document.getElementById("city").innerHTML = locationData[0].results[0].locations[0].adminArea5 + ", " + locationData[0].results[0].locations[0].adminArea3;
    });
}

function displayTempData() {
    let temperature = Math.round(jsonData[0].main.temp)
    let humidity = Math.round(jsonData[0].main.humidity)
    document.getElementById('temp').innerHTML = temperature + "°F";
    document.getElementById("humidity").value = humidity;
    document.getElementById("humiditytext").innerHTML = "Humidity: " + humidity;
    // add a current time feature
    //setStatus(jsonData[0].current_weather.weathercode)
}

function setStatus(x) {
    // reminder: add a for loop somewhere
    
}

function setStyleBasedOnWeather(weather) {
    // to fulfill perf task question later on
    if(weather == "clear") {
        document.getElementById("weathericon").src = "https://img.icons8.com/stickers/100/null/summer.png";
    } else if(weather == "cloudy") {
        weathericon.src = "https://img.icons8.com/stickers/100/null/partly-cloudy-day.png"
    }
}




navigator.geolocation.getCurrentPosition(buildAPIRequest)