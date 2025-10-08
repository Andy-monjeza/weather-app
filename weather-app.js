const API_KEY= '06e256ce3a904b26864155052250410';

function getLocationPromise(){
    return new Promise((resolve,reject)=>{
         navigator.geolocation.getCurrentPosition((pos)=>{
             resolve({
                latitude:pos.coords.latitude,
                longitude:pos.coords.longitude
             })
        },(err)=>{
            reject(err)
         })
    })
}

async function getLocation(){
    try{
      const location= await getLocationPromise();
      return {lat:location.latitude, long:location.longitude};
    }
    catch(err){
        console.log(err)
    }
}

async function fixSource(){

const data = await getLocation();
const {lat, long} = data;
const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${long}&days=1`;

return url;
}

export async function fetchWeather(){
   
    try{
      const url= await fixSource();
      const response= await fetch(url); 
      const data =await response.json();

    return data;
    }
    catch(err){
       console.log(err);
    }
   
}


