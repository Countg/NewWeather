import React, {useState} from 'react';
import axios from 'axios';
import NavBar from './Components/Navigation';
import {WiRain, WiSnow, WiCloud, WiDaySunny} from 'weather-icons-react';
import './App.css';

const {REACT_APP_BASE, REACT_APP_KEY} = process.env;


const App = () => {

  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState({});
 
 



 const fetchApi = (e) => {
   if(e.key === 'Enter'){
    axios.get(`${REACT_APP_BASE}weather?q=${city}, ${country}&units=metric&APPID=${REACT_APP_KEY}`)
    .then(res => {
      setWeather(res.data)
      setCountry('')
      setCity('')
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })

   }
  
 };


const dateFull = (d) => {

  let months = [ 'January', 'February', 'March', 'April', 'May', 'June','July', 'August', 
  'September','October', 'November', 'December'];

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
   

  return `${day} ${month} ${date}, ${year}`


}


const timeFormat = (d) => {
  let hours = d.getHours();
  let minutes = d.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' +minutes : minutes;
  const stritTime = hours + ':' + minutes + ampm;
  return stritTime;

}


  let background = [];
  if(typeof weather.main === "undefined"){
    background.push('app') 
  }else if(weather.main.temp < 6){
    background.push('app cold')
  } else if (weather.main.temp < 20) {
    background.push('app warm')
  }else if (weather.main.temp > 20) {
    background.push('app hot')
  }


  
let weatherIcon = [];
if(typeof weather.main === 'undefined'){
  weatherIcon.push('')
}else if(weather.weather[0].main === 'Rain'){
  weatherIcon.push(<WiRain size={40} color='#09f7ea'/>)
}else if(weather.weather[0].main === 'Clouds'){
  weatherIcon.push(<WiCloud size={40} color='#dd219e'/>)
}else if(weather.weather[0].main === 'Snow'){
  weatherIcon.push(<WiSnow size={40} color='#FF5733'/>)
}else if(weather.weather[0].main === 'Sunny' || weather.weather[0].main === 'Clear'){
  weatherIcon.push(<WiDaySunny size={40} color='#f9ff33'/>)
}




  return (
    <div className={background.join('')}>
      <NavBar timeFormat={timeFormat} dateFull={dateFull}/>
     <div className='grid-container'>
      <div class="city">City:</div>
      <div class="city-input">
      <input 
        type='text' 
        className='search-bar'
        onChange={(e) => setCity(e.target.value)}
        value={city}
        onKeyPress={fetchApi}
       
        />

      </div>
     <div class="country">Country Code:</div>
      <div class="country-input">
      <input
        type='text'
        className='search-bar'
        onChange={(e) => setCountry(e.target.value)}
        value={country}
        onKeyPress={fetchApi}
        />

      </div>
      {typeof weather.main !== "undefined" ? (
        <div className='results'>
        <div>{weather.name}, {weather.sys.country}<div>
           {Math.round(weather.main.temp)}˚
        <div>Feels Like: {Math.round(weather.main.feels_like)}˚</div>
         </div>
        <div>{weather.weather[0].description}, {weatherIcon}</div>
        </div>
        </div>
      
        ): ( " ")}

   </div>
      
     
  
 
   
   
    </div>
  );
}

export default App;
