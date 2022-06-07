import { useEffect, useState } from 'react';

import { fetchWeather } from './api/fetchWeather';

import './App.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const DoSearch = async (e) => {
    if (e.key === 'Enter' && query !== '') {
      const data = await fetchWeather(query);
      console.log(data);
      setWeather(data);
      setQuery('');
    }
  };

  return (
    <div className='main-container'>
      <input
        className='search'
        type='text'
        placeholder='Search...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={DoSearch}
      />
      {weather.main && (
        <div className='city'>
          <h2 className='city-name'>
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>
          <div className='city-temp'>
            {Math.round(weather.main.temp)}
            <span>&deg;C</span>
          </div>
          <div className='info'>
            <img
              className='city-icon'
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
