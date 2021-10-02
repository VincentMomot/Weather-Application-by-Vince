const api = {
    key: "9eb415174fa06ab7744ba1ae33df75b1",
    base: "https://api.openweathermap.org/data/2.5/"
}

searchBtn.addEventListener('click', submit);
citySearch.addEventListener('keypress', enter) //this is the textbox
city.addEventListener('click', submit) //when an old search is re-clicked (might need to add an extra input parameter)

function enter(event) {
    if (event.keyCode == 13) {
        submit()
    }
}
function submit() {
    getWeather(citySearch.value);
    // console.log(citySearch.value);
}

function getWeather(query) {
    var forecastData = fetch(`${api.base}forecast?q=${query}&appid=${api.key}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        cityName.textContent=data.city.name + " " + data.current.dt;
        return data.city.coord
    }).then(function (coordinates) {
        //console.log(coordinates.lon)
        fetch(`${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api.key}`).then(function (onecallweather) {
            return onecallweather.json()
        }).then(function (oneCallData) {
            console.log(oneCallData);
            //oneCallData.
        })
    })
}
