// chartjs.js
import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2'; // Bar = komponent för att rendera stapeldiagram
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './chartjs.css'; // Importerar tillhörande CSS-fil

// Registrerar moduler så att Chart.js vet hur det ska bygga stapeldiagram
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

//  Huvudkomponent
const ChartJSExample = () => {
  // stats: innehåller lista av { country, temperature }
  const [stats, setStats] = useState([]);

  // newCountry: det land användaren skriver in i inputfältet
  const [newCountry, setNewCountry] = useState("");

  // loading: visar laddningsstatus under API-anrop
  const [loading, setLoading] = useState(false);

  //  Hanterar knapptryck: lägg till land i listan
  const handleAddCountry = async () => {
    if (!newCountry.trim()) return; // avbryt om input är tom
    setLoading(true); // visa laddning under fetch

    try {
      //  1. Anropa geokodnings-API för att hämta lat/lon
      const geoRes = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(newCountry)}`
      );

      // Hämta första resultatet (matchande plats)
      const result = geoRes.data.results?.[0];

      if (!result) {
        alert("Landet hittades inte.");
        setLoading(false);
        return;
      }

      // Extrahera relevant platsdata
      const { name, latitude, longitude } = result;

      //  2. Anropa väder-API för att hämta aktuell temperatur
      const weatherRes = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`
      );

      // Extrahera temperaturen från API-svaret
      const temperature = weatherRes.data.current.temperature_2m;

      //  Kontroll: undvik dubletter i listan
      const exists = stats.some(item => item.country === name);
      if (!exists) {
        setStats(prev => [...prev, { country: name, temperature }]); // lägg till i state
      } else {
        alert("Landet är redan tillagt.");
      }

      setNewCountry(""); // töm inputfältet
    } catch (error) {
      console.error("Fel vid hämtning:", error);
      alert("Kunde inte hämta data.");
    }

    setLoading(false); // sluta visa laddning
  };

  //  Rensa hela statistiken
  const handleReset = () => {
    setStats([]); // töm hela stats-listan
  };

  //  Förbereder data till Chart.js stapeldiagram
  const data = {
    labels: stats.map(item => item.country), // X-axel: landsnamn
    datasets: [
      {
        label: 'Temperatur (°C)', // titel för staplarna
        data: stats.map(item => item.temperature), // Y-värden: temperaturer
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // färg på staplar
        borderRadius: 5 // rundade hörn
      }
    ]
  };

  //  Diagraminställningar
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' // visar etikett högst upp
      },
      title: {
        display: true,
        text: 'Temperatur i olika länder' // rubrik över diagram
      }
    },
    scales: {
      y: {
        ticks: {
          callback: value => `${value}°C` // lägg till °C på Y-axelns siffror
        }
      }
    }
  };

  //  JSX för att rendera hela komponenten
  return (
    <div className="chart-container">
      <h2> Temperaturjämförelse</h2>

      {/*  Formulär för att lägga till nya länder */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Ange land (t.ex. France)"
          value={newCountry}
          onChange={e => setNewCountry(e.target.value)} // uppdaterar newCountry
        />
        <button onClick={handleAddCountry} disabled={loading}>
          {loading ? "Laddar..." : "Lägg till"}
        </button>
        <button onClick={handleReset} className="reset-btn">
          Nollställ
        </button>
      </div>

      {/*  Visa stapeldiagram eller fallback-text */}
      {stats.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p>Inga länder tillagda ännu.</p>
      )}
    </div>
  );
};

export default ChartJSExample;
