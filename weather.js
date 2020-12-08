const API_KEYS = 'f042e58c7655d4cbb9bb2933473a6972'
const COORDS = 'coords'
const weather = document.querySelector('.js-weather')


function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}@${place}`
    })
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}
function handlGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude)
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handlGeoSucces, handleGeoError)
} 

function handleGeoError(){
    console.log('cant access geo location')
}

function loadCoords(){
    const loadedCords = localStorage.getItem(COORDS)
    if(loadedCords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init(){
    loadCoords()
}
init();