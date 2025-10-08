import { fetchWeather } from "./weather-app.js";
 
async function renderWeather() {
    try{
      const data = await fetchWeather();
      console.log(data);


    }
    catch(err){
        console.log(err);
    }
}
renderWeather();