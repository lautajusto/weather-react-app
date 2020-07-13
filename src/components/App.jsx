import React, { useState } from 'react';

const API = {
    key: process.env.API_TOKEN,
    base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState('');

    const search = e => {
        if (e.key === "Enter") {
            fetch(`${API.base}weather?q=${query}&units=metric&APPID=${API.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                setQuery('');
                console.log(result);
                }
            );
        }
    }

   const dateBuilder = (d) => {
        let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        let days = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} de ${year}`
    }

        return(
            <div className={
                (typeof weather.main != "undefined") 
                ? ((weather.main.temp > 15)
                ? 'app warm' 
                : 'app')
                : 'app'}>
                <main>
                    <div className="search-box">
                        <input 
                        type="text" 
                        className="search-bar"
                        placeholder="Search..."
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                        onKeyPress={search}
                        />
                        {(typeof weather.main != "undefined") ? (
                            <div>
                                <div>
                                    <div className="location-box">
                                        <div className="location"> {weather.name}, {weather.sys.country} </div>
                                        <div className="date"> {dateBuilder(new Date())} </div>
                                    </div>
                                    <div className="weather-box">
                                        <div className="temp">
                                            {Math.round(weather.main.temp)}°c
                                        </div>
                                        <div className="weather">
                                        {weather.weather[0].main}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : ('')}
                    </div>
                </main>
            </div>
        )
}
export default App;