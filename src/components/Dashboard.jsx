import {React, useState, useEffect} from "react";
import weatherCodes from "../codes";


function Dashboard(props){

    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(false);
    const hourIndex =  (parseInt(new Date().getHours()) + 24 - parseInt(props.hour)) || 0;
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {

      if(props.balloon === null){
          return;
      } 

      
        const fetchData = async () => {
          setLoading(true);
          setWeather(null);
          
          try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + props.balloon[0] + "&longitude=" + props.balloon[0] + "&hourly=temperature_2m,wind_speed_10m,relative_humidity_2m,weather_code&past_days=1&timezone=auto");
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const jsonData = await response.json();

            const temps = jsonData.hourly.temperature_2m;
            const winds = jsonData.hourly.wind_speed_10m;
            const humidities = jsonData.hourly.relative_humidity_2m;
            const codes = jsonData.hourly.weather_code;


            let tempWeather = {
              temperature_2m: temps[hourIndex],
              wind_speed_10m: winds[hourIndex],
              relative_humidity_2m: humidities[hourIndex],
              weather_code: codes[hourIndex]
            }
            
            setWeather(tempWeather);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }finally {
            setLoading(false);
          }
        };
  
        fetchData();
      }, [props.balloon]);

      if(loading) {return <h1 className = "dashboard">Loading...</h1>}


    return (
        
        <div className="dashboard">
            <h1>Weather Data</h1>
            <button onClick={() => setShowPopup(true)}>App Info</button>
            {showPopup &&
            <div id="infoBackdrop">
              <div id="infoPopup">
                <button onClick={()=> setShowPopup(false)}>X</button>
              <p>
                This app uses <span>Windborne Systems</span> constellation API to get live data about the location of their weather balloons, including hourly data up to 23 hours prior to the current time. 
                The app then uses <span>Open-Meteo's</span> live weather API to get weather data around the balloon near the time the location of tha balloon was recorded.
                This simulates getting live weather data from the weather balloon itself. This project is my submission for Windborne System's Engineering Challenge for the role of Junior Web Developer.
              </p>
              <a href="https://windbornesystems.com/">Windborne Systems</a>
              <a href="https://open-meteo.com/">Open-Meteo</a>
              </div>
            </div>
            }
            
            
            <div className="data">
                {props.balloon === null  ? <p>Please Select a Balloon to Start</p> : 
                <div>
                    <p className="large_bold" id="temp">{weather.temperature_2m}°C</p> 
                    <div className="flex center">
                        <p className="medium_bold">{weather.relative_humidity_2m}%</p>
                        <p className="medium_bold">{weather.wind_speed_10m}km/h</p>
                    </div>
                    <p className="medium">{weatherCodes[weather.weather_code]}</p>

                </div>
                
                }
            </div>
        </div>
        
    );
}

export default Dashboard;