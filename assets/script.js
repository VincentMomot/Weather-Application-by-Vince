const api = {
    key: "9eb415174fa06ab7744ba1ae33df75b1",
    base: "api.openweathermap.org/data/2.5/"
}

searchBtn.addEventListener('click', submit);
citySearch.addEventListener('keypress', enter) //this is the textbox
city.addEventListener('click',submit) //when an old search is re-clicked (might need to add an extra input parameter)

function enter(event) {
    if (event.keyCode == 13) {
        submit()
    }
}
function submit() {
    getWeather(citySearch.value)
    console.log(citySearch.value);
}

function getWeather(query) {
    fetch(`${base}`)
}