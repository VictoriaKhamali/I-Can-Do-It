function displayTemperature (response){
    console.log(response.data)
}
let apiKey = "c0dcf5fcd110cf002c1b9db9b7fb417e";
let apiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=Kharkiv&appid=${apiKey}&units=metric`;
  
  axios.get(url).then(displayTemperature);
