const weather =  document.querySelector(".js-weather");

const API_KEY = "51b21c18f52ee140b25db49935ced4d5";
const COORDS = 'coords';

function getWeather(lat, lon){
fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`
    )
    .then(function(response) {
    return response.json();
    })
    .then(function(json){
        const temperature=json.main.temp;
        const place = json.name;
        const country = json.sys.country;
        weather.innerText = `${temperature} @ ${place}  @ ${country}`;
       ; 
    });
}



function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSucces(position){
  
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
        
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
};

function handleGeoError(){
    console.log("위치를 찾을수 없습니다")
    weather.innerText =`위치를 찾을수 없습니다`;
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
};

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}

function init(){
    loadCoords();
};

init();