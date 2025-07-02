import axios from "axios"; // Importerar axios för att göra HTTP-förfrågningar
import React, { useState, useEffect } from 'react'; // Importerar React och två hooks: useState och useEffect
import './axios.css'; // Importerar CSS-stil för komponenten

// Definierar komponenten UserList
const UserList = () => {
  // location: håller stadens namn som användaren skriver in (default = 'Berlin')
  const [location, setLocation] = useState('Berlin');

  // coords: håller koordinaterna för staden (default = Berlin)
  const [coords, setCoords] = useState({ latitude: 52.52, longitude: 13.41 });

  // weather: håller väderinformationen som hämtas från API
  const [weather, setWeather] = useState(null);

  // useEffect körs varje gång coords uppdateras
  useEffect(() => {
    // Om koordinater saknas, gör inget
    if (!coords.latitude || !coords.longitude) return;

    // Hämtar aktuell väderdata baserat på koordinater
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,cloud_cover,wind_speed_10m&timezone=auto`)
      .then(res => setWeather(res.data)) // Sparar väderdatan i state
      .catch(err => console.error(err)); // Loggar eventuella fel
  }, [coords]); // Kör när coords ändras

  // Funktion som körs när användaren klickar på "Sök"-knappen
  const searchCity = () => {
    // Hämtar koordinater baserat på stadens namn via geocoding API
    axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`)
      .then(res => {
        // Om resultat finns, uppdatera koordinaterna
        if (res.data.results && res.data.results.length > 0) {
          const { latitude, longitude } = res.data.results[0];
          setCoords({ latitude, longitude }); // Triggar useEffect
        } else {
          alert('Stad hittades inte'); // Om ingen träff hittas
        }
      })
      .catch(err => console.error('Geocoding error:', err)); // Loggar fel
  };

  // JSX som renderas i webbläsaren
 return (
  <div className="weather-container">
    <h2>Sök väder</h2>
    <input
      type="text"
      value={location}
      onChange={e => setLocation(e.target.value)}
      placeholder="Ange stad"
    />
    <button onClick={searchCity}>Sök</button>

    {weather && weather.current && (
      <div className="weather-result">
        <h3>{location}</h3>
        <p>Temperatur: {weather.current.temperature_2m}°C</p>
        <p>Vind: {weather.current.wind_speed_10m} m/s</p>
        <p>Molntäcke: {weather.current.cloud_cover}%</p>
      </div>
    )}
  </div>
);
}

export default UserList; // Exporterar komponenten så den kan användas i App.js
