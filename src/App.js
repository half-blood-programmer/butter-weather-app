import React, { useEffect, useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import Header from "./components/Header";
import "./App.scss";
import iconLoc from "./assets/location.png";
import iconEnter from "./assets/enter.png";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [info, setInfo] = useState("Please search location first.");
  const [error, setError] = useState(false);
  const [barIcon, setBarIcon] = useState(iconLoc);
  const [notificationPermission, setNotificationPermission] = useState(
    Notification.permission
  );

  useEffect(() => {
    async function requestPermission() {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
      } catch (error) {
        console.error("Error requesting notification permission:", error);
      }
    }

    // Request notification permission on component mount
    if (notificationPermission === "default") {
      requestPermission();
    }
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setBarIcon(iconEnter);
  };

  const handleLeave = (e) => {
    setBarIcon(iconLoc);
  };
  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      try {
        const getData = await fetchWeather(query);

        console.log("getData", getData);
        console.log(notificationPermission);
        setWeather(getData);
        setQuery("");
        if (Notification.permission == "granted") {
          console.log("try push notif");
          navigator.serviceWorker.getRegistration().then(function (reg) {
            console.log("next step push notif");
            var options = {
              body: `Temperature: ${Math.round(getData.main.temp)}°C`,
              icon: `https://openweathermap.org/img/wn/${getData.weather[0].icon}@2x.png`,
              vibrate: [100, 50, 100],
              data: {
                dateOfArrival: Date.now(),
                primaryKey: 1,
              },
              actions: [
                {
                  action: "explore",
                  title: "Explore this new world",
                  icon: "images/checkmark.png",
                },
                {
                  action: "close",
                  title: "Close notification",
                  icon: "images/xmark.png",
                },
              ],
            };
            console.log(options);
            console.log(reg);
            reg.showNotification(`Weather in ${getData.name}`, options);
          });
        }
      } catch (err) {
        setInfo("Sorry, location not found.");
        setError(true);
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="container">
        <Header />
        <div className="pages">
          <div className="result row row_center">
            {weather.main ? (
              <div className="ui_card">
                <div className="weather">
                  <div className="weather_icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    />
                  </div>
                  <div className="weather_city">
                    <span>{weather.name}</span>
                    <sup>
                      <b>{weather.sys.country}</b>
                    </sup>
                  </div>
                  <div className="weather_temp">
                    {Math.round(weather.main.temp)}
                    <sup>&deg;</sup>C
                  </div>
                  <div className="weather_desc">
                    <p>{weather.weather[0].description}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div style={error ? { color: "red" } : {}}>{info}</div>
            )}
          </div>
          <div className="search">
            <div className="bar row row_center">
              <input
                type="text"
                placeholder="Search Location..."
                value={query}
                onChange={(e) => {
                  handleChange(e);
                }}
                onMouseLeave={handleLeave}
                onKeyPress={handleSearch}
              />
              <div className="images row row_center" onClick={handleSearch}>
                <img src={barIcon}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
