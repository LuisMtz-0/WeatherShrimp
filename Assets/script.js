let firstBtn = document.getElementById("firstBtn")
let firstPrompt = document.getElementById("firstPrompt")
let fullPrompt = document.getElementById("fullPrompt")
let locationEl = document.getElementById("location first")
let dayEl = document.getElementById('dayEl')
let tempData = document.getElementById('tempData')
let humData = document.getElementById('humData')
let windData = document.getElementById('windData')
let descData = document.getElementById('descData')

let time = new Date();
let day = time.getDate()
const monthData = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = monthData[time.getMonth()]
let hours = time.getHours()
let min = time.getMinutes()
// Time Function
dayEl.innerText = `${month} ${day} ${hours}:${min}`;

 

firstBtn.addEventListener("click", (event) => {
  let locationName = locationEl.value 
firstPrompt.classList.add('hidden')
  // console.log(firstPrompt.classList )
 fullPrompt.classList.remove('hidden');
let nameLocation = document.getElementById('locationName')

nameLocation.innerText = locationName
 weatherData(locationName)
})


const apiKey = "e2b0fec43f520141b59ae13330214955"
const apiUrl= "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q="

async function weatherData(locationName){
  const response = await fetch(apiUrl+`${locationName}` +`&appid=${apiKey}`)
  let data = await response.json()
  console.log(data)
  let access = data.list
  tempData.innerText = access[0].main.temp
  humData.innerText = access[0].main.humidity
  windData.innerText = access[0].wind.speed
  descData.innerText = access[0].weather[0].description

}

