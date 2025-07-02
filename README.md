project:
  name: Temperaturjämförelse med React, Axios & Chart.js
  description: >
    En interaktiv React-applikation där användaren kan söka efter valfria länder,
    hämta aktuell temperatur via Open-Meteo API, och visualisera vädret i ett dynamiskt
    stapeldiagram. Projektet demonstrerar API-integration, state-hantering och visualisering
    med Chart.js – helt utan behov av API-nycklar.

sections:

  - title: Axios och API-integration
    description: >
      Projektet använder Axios för att hämta data från externa REST API:er. Användaren matar in ett land, 
      som omvandlas till koordinater via Open-Meteo Geocoding API. Dessa används sedan för att hämta aktuell 
      temperatur från Forecast API. Axios används i asynkrona funktioner med `async/await` och felhantering 
      via `try/catch`.

    api_usage:
      geocoding_api: "https://geocoding-api.open-meteo.com/v1/search?name=Berlin"
      forecast_api: "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&timezone=auto"
    concepts:
      - HTTP-anrop med axios.get
      - async/await för asynkrona funktioner
      - API-felhantering med try/catch
      - Dynamiskt bygga URL:er baserat på användarinmatning

  - title: Temperaturjämförelse och visualisering
    description: >
      Temperaturdata samlas dynamiskt i en lista (state) och visas i ett stapeldiagram
      byggt med Chart.js och react-chartjs-2. Användaren kan successivt lägga till nya länder,
      och grafen uppdateras direkt. Dubletter förhindras. Det finns även en nollställningsfunktion.

    dynamic_features:
      - Lägga till valfritt land via input
      - Automatisk visualisering i realtid
      - Nollställningsknapp för att rensa
      - Dublettskydd baserat på landsnamn
    visualisation:
      library: "Chart.js"
      wrapper: "react-chartjs-2"
      diagram_type: "Bar chart (stapeldiagram)"
    images:
      - src/images/Sweden.png
      - src/images/Finland.png
      - src/image/tomt.png
      - src/image/one.png
      - src/image/two.png
      - src/image/many.png
  - title: Använd teknik
  
    tools:
      react: "UI, komponentstruktur och tillståndshantering"
      axios: "HTTP-anrop till REST API:er"
      chartjs: "Visualisering av temperatur i stapeldiagram"
      react_chartjs_2: "React-kompatibel wrapper för Chart.js"
      open_meteo_api: "Kostnadsfritt API för väder och geokodning"
      css: "Responsiv layout och användargränssnitt"
    structure:
      - src/chartjs.js: "Huvudkomponent med API-anrop och graf"
      - src/chartjs.css: "Stilar för layout, knappar och input"
      - src/App.js: "Import och rendering av huvudkomponenten"
      - src/index.js: "Startpunkt för React-applikationen"

  - title: React-applikationsstruktur (CRA)
    description: >
      Projektet är uppsatt med Create React App (CRA), vilket ger tillgång till en färdig
      utvecklingsmiljö och standardkommandon för utveckling, test och build.

    commands:
      - name: npm start
        description: Startar utvecklingsservern på localhost:3000
      - name: npm test
        description: Kör testsviten i watch mode
      - name: npm run build
        description: Bygger appen för produktion (minifierad, optimerad)
      - name: npm run eject
        description: Exporterar all konfiguration från CRA (irreversibel)

  - title: Utvecklings- och användarguide
    setup:
      steps:
        - git clone <repository-url>
        - cd projektnamn
        - npm install
        - npm start
        - Öppna http://localhost:3000 i webbläsare
    recommended_improvements:
      - Lägg till väderikoner och vindhastighet
      - Visa trender (prognoser flera dagar)
      - Spara i localStorage
      - Exportera till PDF eller CSV
      - Lägg till dark mode
    license: MIT
    author:
      name: Ditt Namn
      contact: din@email.com
      website: https://dinhemsida.com
