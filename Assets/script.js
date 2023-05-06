let firstBtn = document.getElementById("firstBtn")
let firstPrompt = document.getElementById("firstPrompt")
let fullPrompt = document.getElementById("fullPrompt")
let locationEl = document.getElementById("location first")
let dayEl = document.getElementById('dayEl')
let tempData = document.getElementById('tempData')
let humData = document.getElementById('humData')
let windData = document.getElementById('windData')
let descData = document.getElementById('descData')
let secondBtn = document.getElementById('secondBtn')
let fiveDayData = document.getElementById('fiveDayData')
let imgEl = document.getElementById('imgEl')
let nameLocation = document.getElementById('locationName')
let historyEl = document.getElementById('historyEl')
let humDataSm = document.getElementById('humDataSm')
let tempDataSm = document.getElementById('tempDataSm')

let storage = localStorage.getItem('weatherData') ? JSON.parse(localStorage.getItem('weatherData')) : []


// historyEl.innerHTML = ` 
// <button onClick='weatherData(storage)'>${storage}</button>`

let time = new Date();
let day = time.getDate()
const monthData = ["January","February","March","April","May","June","July","August","September","October","November","December"];
let month = monthData[time.getMonth()]
let hours = time.getHours()
let min = time.getMinutes()
// Time Function
dayEl.innerText = `${month} ${day} ${hours}:${min}`;

 
// This will be the starting prompt that will ask for a location name
firstBtn.addEventListener("click", (event) => {
  let locationName = locationEl.value 

// let nameLocation = document.getElementById('locationName')
if(locationName){
 weatherData(locationName)
 appendData(locationName)
}

})

secondBtn.addEventListener('click', (event) =>{
   let locationName = document.getElementById('locationTwo')
   weatherData(locationName.value)
   appendData(locationName)
})

const apiKey = "e2b0fec43f520141b59ae13330214955"
const apiUrl= "https://api.openweathermap.org/data/2.5/forecast?&units=imperial&q="

async function weatherData(locationName){
  firstPrompt.classList.add('hidden');
  fullPrompt.classList.remove('hidden');

  const response = await fetch(apiUrl+`${locationName}` +`&appid=${apiKey}`)
  let data = await response.json()
  let access = data.list
  let iconEl = access[0].weather[0].icon
  nameLocation.innerText = locationName
  
  
  

  imgEl.src =  "https://openweathermap.org/img/w/" + iconEl+ ".png"
  tempDataSm.innerText = access[0].main.temp
  humDataSm.innerText = access[0].main.humidity
  tempData.innerText = access[0].main.temp
  humData.innerText = access[0].main.humidity
  windData.innerText = access[0].wind.speed
  descData.innerText = access[0].weather[0].description

  // localStorage.setItem('weatherData', JSON.stringify(locationName))
  fiveDayWeather(data)

}

function fiveDayWeather(data){
fiveDayData.innerHTML = ''
fiveDayData.innerHTML = ` <div class="row-span-3 md:grid hidden grid-rows-3 text-white font-bold">
<p class="underline  text-center"> Day</p>
<p class="underline  text-center my-auto"> Temperature:</p>
<p class="underline  text-center my-auto"> Humidity:</p>
</div>`
  for(let i = 0; i < data.list.length; i++) {

    if(data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
      let divEl = document.createElement('div')
      divEl.className = "row-span-3 md:grid hidden grid-rows-3"

      let dayP = document.createElement('p')
      dayP.className = "underline text-rose-700 text-center"
      dayP.innerText = new Date(data.list[i].dt_txt).toLocaleDateString()

      let tempP = document.createElement('p')
      tempP.className = "underline text-rose-700 text-center my-auto"
      tempP.innerText = data.list[i].main.temp

      let humP = document.createElement('p')
      humP.className = "underline text-rose-700 text-center my-auto"
      humP.innerText = data.list[i].main.humidity

      divEl.append(dayP, tempP, humP)
      fiveDayData.append(divEl)
     
    }
  }
}

function appendData(location){

 console.log(storage)

  localStorage.setItem('weatherData', JSON.stringify(location))


//   storage.forEach(element => {
    historyEl.innerHTML = ` 
<button onClick='weatherData(storage)'>${storage}</button>`
  // });
  
}
