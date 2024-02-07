import React, { useState } from 'react';
import './weather.css';
const WeatherApp = () => {
  const [placeName, setPlaceName] = useState('');
  const [temperature, setTemperature] = useState(null);
  const [error, setError] = useState(null);
  const apiKey = '3824319164d57e13a689ca1f8539e81a';
  const baseUrl = 'https://api.openweathermap.org/data/2.5/';


  const fetchTemperature = async () => {
    try {
      // Construct the URL for fetching weather data based on place name
      const url = `${baseUrl}weather?q=${placeName}&appid=${apiKey}&units=metric`;

      // Fetch weather data from OpenWeatherMap API
      const response = await fetch(url);

      // Check if response is successful (status code 200)
      if (response.ok) {
        // Parse JSON response
        const data = await response.json();

        // Extract temperature from response data
        const temperature = data.main.temp;

        // Update state with temperature
        setTemperature(temperature);
        setError(null);
      } else {
        // If response is not successful, throw an error
        throw new Error('Failed to fetch weather data');
      }
    } catch (error) {
      // If an error occurs during the fetch operation, set the error state
      setError('Error fetching weather data. Please try again.');
      setTemperature(null);
    }
  };

  const handleFetchTemperature = async () => {
    if (placeName.trim() !== '') {
      await fetchTemperature();
    } else {
      setError('Please enter a place name.');
    }
  };

  return (
    <div >
      <div className='weather-container'>
          <h1 className="weather-text">Weather App</h1>
      </div>
      <div className='field'>
      <input
        type="text"
        value={placeName}
        onChange={(e) => setPlaceName(e.target.value)}
        placeholder="Enter place name"
      />
      <button onClick={handleFetchTemperature}>show Temperature</button>
      {error && <p>{error}</p>}
      {temperature && <p><b>Temperature: {temperature}°C</b></p>}
    </div>
    </div>
  );
};

export default WeatherApp;
