const apiKey = "9fb66e064038cf71984a4a9b4701ccca";
const searchBtn = document.querySelector(".searchBtn");
const clearBtn = document.querySelector(".clearBtn");
const weatherData = document.querySelector(".flex");
const weatherCard = document.querySelector(".weatherCard")
let arr =[];
let id = 0;


// function remove(){
    
//     weatherData.removeChild(weatherCard);
// }

weatherData.addEventListener("click", (e) => {
    let element = e.target;
    const elementId = element.id;
    if(elementId == name){
        element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
        var newArr = arr.filter(function(index, value, array){
            return value != name;
        });
        arr = newArr;
    }
});

clearBtn.addEventListener("click", function(){
    document.querySelector(".flex").innerHTML = "";
    arr =[];
})

searchBtn.addEventListener("click", function(){
    
    fetchWeather(document.querySelector(".searchBar").value);
    displayWeather(document.querySelector(".searchBar").value);
    
})

document.addEventListener("keyup", function(evt){
    if(evt.key == "Enter"){
        fetchWeather(document.querySelector(".searchBar").value);
        displayWeather(document.querySelector(".searchBar").value);
    } 
})

function fetchWeather(city){
    fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey
    )
    .then(response => response.json())
    .then(data => displayWeather(data));
}

// function apiResult (data){
//     if(data.cod == "200"){
//         let ans = {
//             humidity: data.main.humidity,
//             temp: data.main.temp,
//             wind: data.wind.speed,
//             description: data.weather[0].description,
//             icon: data.weather[0].icon,
//             name: data.name,
//             cod: data.cod
//         }
//         displayWeather(ans);
//         arr.push(name);
//     console.log(name, cod, icon, description, temp, wind, country, humidity);
    
//     } else{
//         alert("Invalid city");
//     }
// }

function displayWeather(data){
    if(arr.includes(data.name)){
        alert("This City is already being displayed, enter a new city name")
    } else if(data.cod == "200"){
        const name = data.name;
    const cod = data.cod;
    const description = data.weather[0].description;
    const temp = data.main.temp;
    const wind = data.wind.speed;
    const humidity = data.main.humidity;
    const icon = data.weather[0].icon;
    const country = data.sys.country;


    const weatherCard = `<div class="weatherCard ${id}">
    <svg id="${name}" class="delete" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
    <h2 class="city">
        Weather in ${name}, ${country}.
    </h2>
    <div class="temp"><h2>${temp}°C</h2></div>
    <div class="description">${description}</div>
    <div class="icon">
        <img src="https://openweathermap.org/img/wn/${icon}.png">
    </div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">WindSpeed: ${wind}km/h</div>
</div>
`
        id++;
    document.querySelector(".searchBar").value = "";
    arr.push(name);
    console.log(arr);
    const position = "afterbegin";
    document.querySelector(".flex").insertAdjacentHTML(position, weatherCard);
    } else if (data.cod == "404"){
        alert("Invalid City name");
    }
    
    
}

