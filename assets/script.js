const api = {
    //key: "e4ce42a714cb9c3a4f80a484e0b90750", //spare key
    key: "b8f53b07d67511ae3702eb0275e02472", //logan's key
    //key: "9eb415174fa06ab7744ba1ae33df75b1", //my key
    base: "https://api.openweathermap.org/data/2.5/" //used for onecall and forcast
}

//var cityEL = document.querySelector(".cityButton");
searchBtn.addEventListener('click', submit);
citySearch.addEventListener('keypress', enter) //this is the textbox
//cityEL.addEventListener('click', submitOldCity) //when an old search is re-clicked (might need to add an extra input parameter)
weatherDiv.style.display = "none";
searchedCitiesVince1 = [];
var toggle;

//runs the entire weather when enter or search is clicked
function enter(event) {
    if (event.keyCode == 13) { //enter button to search
        submit()
    }
}
function submit() {
    toggle=1;
    getWeather(citySearch.value);
    weatherDiv.style.display = "block"; //displays only when city is entered
    citySearch.value = '';
}

//gets the weather when old search is clicked
function submitOldCity(btnID) {
    toggle=0;
    searchedCitiesVince1.push(btnID);   //repeat issues here
    getWeather(btnID);
    weatherDiv.style.display = 'block'; //displays only when city is entered
}


//local storage
var SaveVince1 = localStorage.getItem("SaveVince1");
if (SaveVince1 == 1) {
    var localCountVince123 = localStorage.getItem("localCountVince123");
    var searchedCitiesVince1=JSON.parse(localStorage.getItem("searchedCitiesVince1"));
    for(var j=0; j<localCountVince123; j++){

        createNewButton(searchedCitiesVince1[j])
        //generate buttons here
    }
}
else{
    searchedCitiesVince1 = [];
    var localCountVince123 = 0;
    console.log("nostorage")
}


var date;
var icon;
const arr = [d1, d2, d3, d4, d5, i1, i2, i3, i4, i5, t1, t2, t3, t4, t5, w1, w2, w3, w4, w5, h1, h2, h3, h4, h5];

function getWeather(query) {
    fetch(`${api.base}forecast?q=${query}&appid=${api.key}`).then(function (response) {
        return response.json();
    }).then(function (data) {
        //console.log(data);
        var dateUnix = new Date(data.list[0].dt * 1000);
        timeconvert(dateUnix);
        var name1 = data.city.name
        cityName.textContent = name1 + " " + "(" + date + ")";

        if (!searchedCitiesVince1.includes(name1) && toggle==1) {
            searchedCitiesVince1[localCountVince123]=name1;
            jsonCities=JSON.stringify(searchedCitiesVince1);
            localStorage.setItem("searchedCitiesVince1",jsonCities);
            createNewButton(name1);
            localCountVince123++;
            localStorage.setItem("localCountVince123",localCountVince123)

        }

        localStorage.setItem("SaveVince1", SaveVince1);
        SaveVince1 = 1;
        
        return data.city.coord;

    }).then(function (coordinates) {
        //console.log(coordinates.lon)
        fetch(`${api.base}onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${api.key}`).then(function (onecallweather) {
            return onecallweather.json()
        }).then(function (oneCallData) {
            //console.log(oneCallData); //all weather data/////////////////////////////////////////////////////////
            temperature = oneCallData.current.temp
            tempConvert(temperature);
            var weather = oneCallData.current.weather[0].id;
            weatherIcon(weather);
            var textnode = document.createTextNode(icon);
            cityName.appendChild(textnode);

            //Current Data displayed
            temp.textContent = "Temp: " + tempF + " °F";
            wind.textContent = "Wind: " + oneCallData.current.wind_speed + " mph";
            humidity.textContent = "Humidity: " + oneCallData.current.humidity + "%";
            uv.textContent = "UV Index: " + oneCallData.current.uvi;
            uvColor(oneCallData.current.uvi);

            for (var i = 0; i < 5; i++) { //sets the 5 future days
                //date
                var dateUnix = new Date(oneCallData.daily[i + 1].dt * 1000);
                timeconvert(dateUnix);
                arr[i].textContent = date;
                //icons
                var weather = oneCallData.daily[i + 1].weather[0].id;
                weatherIcon(weather);
                arr[i + 5].textContent = icon;
                //prints out the temp readings
                temperature = oneCallData.daily[i + 1].temp.day;
                tempConvert(temperature);
                arr[i + 10].textContent = "Temp: " + tempF + " °F";
                //prints out the temp readings
                arr[i + 15].textContent = "Wind: " + oneCallData.daily[i + 1].wind_speed + "mph";
                //prints out the humidity readings
                arr[i + 20].textContent = "Humidity: " + oneCallData.daily[i + 1].humidity + "%";
            }

        })
    })
}

//converts Unix to M/d/yyyy
function timeconvert(dateUnix) {
    var year = dateUnix.getFullYear();
    var month = dateUnix.getMonth() + 1;
    var day = dateUnix.getDate();
    date = month + "/" + day + "/" + year
}

//converts k to deg F
var tempF;
function tempConvert(temperature) {
    tempF = Math.round((temperature - 273.15) * 9 / 5 + 32);
}


//creates the weather icons
function weatherIcon(weather) {
    if (weather > 800) {
        icon = String.fromCodePoint(0x1F325);
    }
    else if (weather == 800) {
        icon = String.fromCodePoint(0x2600);
    }
    else if (weather > 299 && weather < 600) {
        icon = String.fromCodePoint(0x1F327);
    }
    else if (weather < 300) {
        icon = String.fromCodePoint(0x26C8);
    }
    else if (weather > 599 && weather < 700) {
        icon = String.fromCodePoint(0x1F328);
    }
    else {
        icon = String.fromCodePoint(0x1F32B);
    }
}

//this is to make a new button still needs work?
function createNewButton(cityID) {
    let btn = document.createElement('button');
    btn.innerHTML = cityID;
    //console.log(cityName.textContent)
    cityDiv.appendChild(btn);
    btn.classList.add('cityButton');
    btn.id = cityID;
    //when an old search is re-clicked (might need to add an extra input parameter)
}

cityDiv.addEventListener('click', function (event) {
    if (event.target.className === 'cityButton') {
        submitOldCity(event.target.id);
    } else {
        return;
    }
});

function uvColor(uvVal){
    if(uvVal<2){
        uv.style.backgroundColor="lightgreen";
    }
    else if(uvVal>8){
        uv.style.backgroundColor="red";
    }
    else{
        uv.style.backgroundColor="yellow";
    }
}