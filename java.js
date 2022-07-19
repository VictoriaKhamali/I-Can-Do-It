function displayTemperature (response){
    console.log(response.data)
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
     let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
 let descriptionElement = document.querySelector("#description");
 descriptionElement.innerHTML = response.data.weather[0].description;
}
let apiKey = "c0dcf5fcd110cf002c1b9db9b7fb417e";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayTemperature);
