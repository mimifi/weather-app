let searchButton = document.getElementById("search-btn");
let searchText = document.getElementById("search-text");
let cityName = document.getElementById("searched-city");
let icon = document.getElementById("city-icon");
let temperature = document.getElementById("temp");
let humidity = document.getElementById("city-humidity");

searchButton.addEventListener("click", requestWeatherDetails);
searchText.addEventListener("keyup", pressEnter);

function pressEnter(event) {
    if (event.key === "Enter") {
        requestWeatherDetails()
    }
}

function requestWeatherDetails() {
    if (searchText.value === "") {
        alert("Please write the name of city in the input field.")
    } else {
        const app_key = "883492646569ed928012d54c12f389a6";
        const search_link = "https://api.openweathermap.org/data/2.5/weather?q=" + searchText.value + "&appid=" + app_key;
        const request = new XMLHttpRequest();
        getWeatherDetails(search_link, request)
    }
}

function getWeatherDetails(url, request) {
    request.open('GET', url, true);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            showWeatherDetails(request);
        }
    };
    request.send();
}

function showWeatherDetails(request) {
    request.onload = function () {
        isEmpty();
        let data = JSON.parse(this.response);
        icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
        cityName.append(data.name);
        temperature.append(Math.round(data.main.temp - 273) + "°");
        humidity.append(data.main.humidity + "%");
    };
}

function isEmpty() {
    cityName.innerHTML = "";
    icon.src = "";
    temperature.innerHTML = "";
    humidity.innerHTML = "";
    console.log('This is name of city', cityName.innerHTML);
}


