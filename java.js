function formateDate(timestamp) {
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`}
    let days =[ "Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let day = days[date.getDay()];


    return `${day}, ${hours}:${minutes}`
}

function formatDay (timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];
return days[day];
}
function displayForecast (response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ` <div class = "row">`;
  
  forecast.forEach(function(forecastDay, index) {
if (index < 6 ){

forecastHTML =
  forecastHTML +
  ` 
               <div class = "col-2">
                   <div class = "weather-forecast-date">
                   ${formatDay(forecastDay.dt)}
                </div>
                   <img src ="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                   alt=""
                   width="42"/>
                   <div clss="weather-forecast-temperature">
                       <span class=" weather-forecast-temp-max">
                  ${Math.round(forecastDay.temp.max)}° </span>
<span class=" weather-forecast-temp-min">
                ${Math.round(forecastDay.temp.min)}° </span>
                   </div>
               </div>
           `;
}
  });
  
           forecastHTML = forecastHTML + `</div>`
           forecastElement.innerHTML = forecastHTML;
           
}
function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "c0dcf5fcd110cf002c1b9db9b7fb417e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayTemperature (response){
  
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description"); 
     let humidityElement = document.querySelector("#humidity");
let windElement = document.querySelector("#wind");
let dateElement = document.querySelector("#date");
let iconElement = document.querySelector("#icon");

celsiusTemperature = response.data.main.temp;
 
    
    
temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
 descriptionElement.innerHTML = response.data.weather[0].description;
 humidityElement.innerHTML = response.data.main.humidity;
 windElement.innerHTML = Math.round(response.data.wind.speed);
 dateElement.innerHTML = formateDate(response.data.dt *1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
 iconElement.setAttribute("alt",response.data.weather[0].description) ;  
    
 getForecast(response.data.coord);
    }

     function search(city){
       let apiKey = "c0dcf5fcd110cf002c1b9db9b7fb417e";
     
       let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang={lang}`;
  axios.get(apiUrl).then(displayTemperature);
     }

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement=document.querySelector("#city-input");
  search(cityInputElement.value);

}
function displayFahrenheitTemperature(event){
    event.preventDefault();
     let temperatureElement = document.querySelector("#temperature");
     celsiusLink.classList.remove("active");
     fahrenheitLink.classList.add("active")
let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
     temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

function displayCelsiusTemperature(event){
  event.preventDefault()
   celsiusLink.classList.add("active");
   fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

  function retrievePosition(position) {
    let apiKey = "c0dcf5fcd110cf002c1b9db9b7fb417";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);


  let celsiusTemperature = null;

 let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);


  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);


  let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);





 search("Kyiv");

