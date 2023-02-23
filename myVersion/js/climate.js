'use stricts'

/* Variables */
const inputCity = document.querySelector("#input-city") 
const inputContainer = document.querySelector("#forminput-container")
const searchBtn = document.querySelector("#search")

const apiKey = "a67a44db671c6c099daf24e92899cb1c"
const countryApi = "https://www.countryflagsapi.com/png/"

const citySpan = document.querySelector("#location span") 
const temperatureSpan = document.querySelector("#temperature span") 
const tempSpan = document.querySelector("#temp span") 
const humiditySpan = document.querySelector("#humidity span") 
const windSpan = document.querySelector("#wind span")
const weatherIcon = document.querySelector("#weather-icon")
const countryElement = document.querySelector("#country")
const weatherClass = document.querySelector("#weather")

/* Functions */
const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`

    const res = await fetch (apiWeatherURL)
    const data = await res.json()
    console.log(data)
    return data
}

const showWeatherData = async(city) => {
    const data = await getWeatherData(city)

    citySpan.innerText = data.name
    countryElement.setAttribute('src', countryApi + data.sys.country)
    temperatureSpan.innerText = `${parseInt(data.main.temp)} °C`
    tempSpan.innerText = data.weather[0].description
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
    humiditySpan.innerText = `${data.main.humidity} %`
    windSpan.innerText = `${data.wind.speed} km/h`
    weatherClass.classList.remove("hide")
    
}

/* Events */

searchBtn.addEventListener('click', (e) => {
    e.preventDefault()
    const city = inputCity.value

    showWeatherData(city)
})

inputCity.addEventListener('keyup', (e) => {
    if(e.code === "Enter") {
        const city = e.target.value

        showWeatherData(city)        
    }
})