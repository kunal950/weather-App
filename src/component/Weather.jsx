import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear from "../assets/clear.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import rain from "../assets/rain.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";

const Weather = () => {
  const [weatherdata, setweatherdata] = useState({});
  const inputref = useRef();

  const allicon = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "03d": cloud,
    "02n": cloud,
    "03n": cloud,
    "04d": cloud,
    "09d": drizzle,
    "10d": rain,
    "11d": rain,
    "13d": snow,
    "50d": wind,
    "09n": drizzle,
    "10n": rain,
    "11n": rain,
    "13n": snow,
    "50n": wind,
  };

  const search = async (city) => {
    if (!city) return alert("Please enter city name");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${
        import.meta.env.VITE_API_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) return alert(data.message);
      if (city.toUpperCase() !== data.name.toUpperCase()) {
        return alert("City not found");
      }

      const icon = allicon[data.weather[0].icon] || clear;
      setweatherdata({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        min_temperature: Math.floor(data.main.temp_min),
        max_temperature: Math.floor(data.main.temp_max),
        windspeed: data.wind.speed,
        location: data.name,
        icon: icon,
        country: data.sys.country,
      });
    } catch (error) {
      setweatherdata(false);
      console.error(error);
    }
  };
  useEffect(() => {
    search("new delhi");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputref} type="text" placeholder="Search..." />
        <img
          src={search_icon}
          alt="search_icon"
          onClick={() => search(inputref.current.value)}
        />
        {/* <button>Search</button> */}
      </div>
      {weatherdata ? (
        <>
          <img src={weatherdata.icon} alt="" className="weather-icon" />
          <p className="temp">{weatherdata.temperature}°C</p>

          <p className="location">
            {weatherdata.location},{weatherdata.country}
          </p>
          <div className="wether-data">
            <div className="col">
              <img src={humidity} alt="" />
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind} alt="" />
              <div>
                <p>{weatherdata.windspeed} km/h</p>
                <span>wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Please Wait. It's Loading... </p>
        </>
      )}
    </div>
  );
};

export default Weather;
