const api = {
    key: "9eb415174fa06ab7744ba1ae33df75b1",
    base: "https://api.openweathermap.org/data/2.5/"
}

searchBtn.addEventListener('click', submit);
citySearch.addEventListener('keypress', enter) //this is the textbox
city.addEventListener('click', submit) //when an old search is re-clicked (might need to add an extra input parameter)
weatherDiv.style.display = "none";

function enter(event) {
    if (event.keyCode == 13) {
        submit()
    }
}
function submit() {
    getWeather(citySearch.value);
    // console.log(citySearch.value);
    citySearch.value = '';
    weatherDiv.style.display = "block";
}

var date;
const arr = [d1, d2, d3, d4, d5, i1, i2, i3, i4, i5, t1, t2, t3, t4, t5, w1, w2, w3, w4, w5, h1, h2, h3, h4, h5]

function getWeather(query) {
    fetch(`${api.base}forecast?q=${query}&appid=${api.key}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        //console.log(data);
        var dateUnix = new Date(data.list[0].dt * 1000);
        timeconvert(dateUnix);
        cityName.textContent = data.city.name + " " + "(" + date + ")";
        return data.city.coord
    }).then(function (coordinates) {
        //console.log(coordinates.lon)
        fetch(`${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api.key}`).then(function (onecallweather) {
            return onecallweather.json()
        }).then(function (oneCallData) {
            console.log(oneCallData); //all weather data
            temperature = oneCallData.current.temp
            tempConvert(temperature);
            temp.textContent = "Temp: " + tempF + " °F";
            wind.textContent = "Wind: " + oneCallData.current.wind_speed + " mph";
            humidity.textContent = "Humidity: " + oneCallData.current.humidity + "%";
            uv.textContent = "UV Index: " + oneCallData.current.uvi;
            for (var i = 0; i < 5; i++) {
                var dateUnix = new Date(oneCallData.daily[i + 1].dt * 1000);
                timeconvert(dateUnix);
                arr[i].textContent = date;

                temperature = oneCallData.daily[i + 1].temp.day;
                tempConvert(temperature);
                arr[i + 10].textContent = "Temp: " + tempF + " °F";

                arr[i + 15].textContent = "Wind: " + oneCallData.daily[i + 1].wind_speed + "mph";

                arr[i + 20].textContent = "Humidity: " + oneCallData.daily[i + 1].humidity + "%";
            }




        })
    })
}



function timeconvert(dateUnix) {
    var year = dateUnix.getFullYear();
    var month = dateUnix.getMonth() + 1;
    var day = dateUnix.getDate();
    date = month + "/" + day + "/" + year
}

var tempF;
function tempConvert(temperature) {
    tempF = Math.round((temperature - 273.15) * 9 / 5 + 32);
}