import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { FaCloudSun, FaCloud, FaSun, FaCloudRain, FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi'; 

const apiKey = "a6162c4c0b97dbc4d049b1d4cb8951e6"; 
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [threshold, setThreshold] = useState(30); 
  const [alerts, setAlerts] = useState([]);
  const [unit, setUnit] = useState('metric'); 

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
          )
        );
        const data = responses.map(response => response.data);
        setWeatherData(data);
        checkThresholds(data); 
      } catch (error) {
        console.error("Error fetching weather data", error);
      }
    };

    const checkThresholds = (data) => {
      const newAlerts = [];
      data.forEach(cityWeather => {
        if (cityWeather.main.temp > threshold) {
          newAlerts.push({
            city: cityWeather.name,
            temp: cityWeather.main.temp,
            condition: cityWeather.weather[0].main,
          });
        }
      });
      setAlerts(newAlerts);
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 5 * 60 * 1000);
    return () => clearInterval(interval); 
  }, [unit, threshold]); 

  const handleThresholdChange = (e) => {
    setThreshold(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Clear':
        return <FaSun className="weather-icon" />;
      case 'Clouds':
        return <FaCloud className="weather-icon" />;
      case 'Rain':
        return <FaCloudRain className="weather-icon" />;
      default:
        return <FaCloudSun className="weather-icon" />;
    }
  };

  
  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); 
    return date.toLocaleString(); 
  };

  return (
    <div className="container">
      <h1>Weather Monitoring System</h1>
      
      <div className="row">
        <div className="col-md-6">
          <label>
            Temperature Alert Threshold: 
            <input
              type="number"
              className="form-control"
              value={threshold}
              onChange={handleThresholdChange}
              style={{ display: 'inline', width: '100px', marginLeft: '10px' }}
            />
            °{unit === 'metric' ? 'C' : 'F'}
          </label>
        </div>

        <div className="col-md-6">
          <label>
            Temperature Unit:
            <select
              className="form-control"
              value={unit}
              onChange={handleUnitChange}
              style={{ display: 'inline', width: '150px', marginLeft: '10px' }}
            >
              <option value="metric">Celsius</option>
              <option value="imperial">Fahrenheit</option>
            </select>
          </label>
        </div>
      </div>

      {/* Display weather data */}
      <div className="weather-data">
        <h2>Current Weather Data</h2>
        <div className="row">
          {weatherData.length > 0 && weatherData.map((cityWeather, index) => (
            <div className="col-md-6" key={index}>
              <div className="card">
                <div className="card-body">
                  <h3>{cityWeather.name}</h3>
                  {getWeatherIcon(cityWeather.weather[0].main)}
                  <div className="temp-value">{Math.round(cityWeather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}</div>
                  
                  <p>Feels like: {Math.round(cityWeather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}</p>
                  <p>Condition: {cityWeather.weather[0].main}</p>

                  {/* Display Humidity */}
                  <div className="info-row">
                    <WiHumidity className="info-icon" /> Humidity: {cityWeather.main.humidity}%
                  </div>
                  
                  {/* Display Wind Speed */}
                  <div className="info-row">
                    <FaWind className="info-icon" /> Wind Speed: {cityWeather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
                  </div>

                  {/* Last update time */}
                  <p>Last updated: {formatDate(cityWeather.dt)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Section */}
      <div className="alerts mt-5">
        <h2>Alerts</h2>
        {alerts.length > 0 ? (
          <ul className="list-group">
            {alerts.map((alert, index) => (
              <li key={index} className="list-group-item list-group-item-danger">
                <strong>{alert.city}</strong> exceeded the threshold with a temperature of {alert.temp}°{unit === 'metric' ? 'C' : 'F'} ({alert.condition})
              </li>
            ))}
          </ul>
        ) : (
          <p>No alerts at the moment.</p>
        )}
      </div>
    </div>
  );
}

export default App;
