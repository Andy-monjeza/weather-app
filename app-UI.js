import { fetchWeather } from "./weather-app.js";

const current_container=document.querySelector('.current_weather');
const hourForecast_container=document.querySelector('.hourly_forecast')
const extras_container= document.querySelector('.extras');

async function renderWeather() {
    try{
      const data = await fetchWeather();
      console.log(data);
      const img=document.createElement("img");
      const condition_text=document.createElement('span');
      const temperature= document.createElement('span');
      const location= document.createElement('span');

      const locationIcon = document.createElement("img");
      locationIcon.src = "https://lucide.dev/icons/map-pin.svg";
      locationIcon.alt = "Location";
      locationIcon.width = 24;
      locationIcon.height = 24;

      
      img.src=data.current.condition.icon;
      current_container.appendChild(img);
      img.classList.add('current_weather_icon');
      location.textContent=data.location.name;
      
      location.classList.add('location-tag');
      temperature.textContent=Math.floor(data.current.temp_c) + "°c"
      temperature.classList.add('temp');
      condition_text.textContent=data.current.condition.text;
      condition_text.classList.add('condition-text');


      const children=[img, location, temperature, condition_text];

      children.forEach((child)=>{
        current_container.appendChild(child);
      })

      const hourlyData = data.forecast.forecastday[0].hour.map(hour => {
      const date = new Date(hour.time);
          let hours = date.getHours();
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;

          return {
            time: `${hours} ${ampm}`,
            temp: hour.temp_c,
            condition: hour.condition.text,
            icon: `https:${hour.condition.icon}`
          };
     });


      hourlyData.forEach(data=>{
        hourForecast_container.innerHTML+=`
        <div class="hour-data-container">
         <span class="hour-time">${data.time}</span>
         <img class="hour_data_icon" src=${data.icon} alt="icon.jpg">
         <span class="hour-temp">${data.temp}°c</span>
        </div>
        `
      })
     
 
    /*
   const extras_data = [
  {
    name: "Wind Speed",
    icon: "https://cdn-icons-png.flaticon.com/512/5536/5536048.png", // wind speed icon
    value: data.current.wind_kph + " km/h",
  },
  {
    name: "Humidity",
    icon: "https://cdn-icons-png.flaticon.com/512/4148/4148460.png", // droplet/humidity icon
    value: data.current.humidity + " %",
  },
  {
    name: "Wind Direction",
    icon: "https://cdn-icons-png.flaticon.com/512/54/54759.png", // compass arrow
    value: data.current.wind_dir,
  },
  {
    name: "UV Index",
    icon: "https://cdn-icons-png.flaticon.com/512/979/979585.png", // sun with UV rays
    value: data.current.uv,
  },
  {
    name: "Feels Like",
    icon: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", // thermometer person
    value: data.current.feelslike_c + "°C",
  },
  {
    name: "Cloudiness",
    icon: "https://cdn-icons-png.flaticon.com/512/414/414927.png", // cloud cover
    value: data.current.cloud + " %",
  },
  {
    name: "Visibility",
    icon: "https://cdn-icons-png.flaticon.com/512/4005/4005801.png", // eye/visibility
    value: data.current.vis_km + " km",
  },
  {
    name: "Pressure",
    icon: "https://cdn-icons-png.flaticon.com/512/4835/4835972.png", // barometer
    value: data.current.pressure_mb + " mb",
  },
];
*/
   extras_data.forEach(data=>{
     extras_container.innerHTML+=`
     <img src=${data.icon} class="extras_icons">
     <span class="extras_text">${data.value}</span>
     `


   })


    }
    catch(err){
        console.log(err);
    }
}
renderWeather();