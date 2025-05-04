import { OPENWEATHER_API_KEY } from "./SecretKeys.js";

export function initWeather(weatherElement, cityElement) {
    function onGeoOk(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
    
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
        fetch(url).then(response => response.json())
            .then(data => {
                cityElement.innerText = data.name;
                weatherElement.innerText = `${data.weather[0].main} / ${data.main.temp}°C`;
            });
    
    }
    
    function onGeoError() {
        alert("Can't find you. No weather for you.");
    }
    
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
}
