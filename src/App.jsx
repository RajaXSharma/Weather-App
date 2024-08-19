import { useState } from "react";
import "./App.css";
import { IoWaterOutline } from "react-icons/io5";
function App() {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  console.log(weatherData);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const fetchData = async () => {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }&units=metric`
    );
    const res = await data.json();
    setWeatherData(res);
  };


  function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour >= 5 && hour < 12) {
      return "Good morning!";
    } else if (hour >= 12 && hour < 17) {
      return "Good day!";
    } else if (hour >= 17 && hour < 20) {
      return "Good evening!";
    } else {
      return "Good night!";
    }
  }

  return (
    <div className="container">
      <div className="weatherCard">
        <div className="cityName">
          <div>{weatherData?.name || "--"}</div>
          <div>{`${day}-${month}-${year}`}</div>
        </div>
        <div className="weatherInfo">
          <div className="temprature">
          {Math.round(weatherData?.main.temp) || "--"}&deg;<div className="weather">{weatherData?.weather[0].main || "--"}</div>
          </div>
          <div className="otherInfo">
            <div className="max">Max {weatherData?.main.temp_max || "--"}&deg;C</div>
            <div className="min">Min {weatherData?.main.temp_min || "--"}&deg;C</div>
            <div className="humidity">
              <IoWaterOutline className="humidity-Icon" /> {weatherData?.main.humidity || "--"}%
            </div>
          </div>
        </div>
        <div className="welcome">{getGreeting()}</div>

        <div className="search-input-container">
          <input
            type="text"
            name="text"
            className="input"
            placeholder="Enter City..."
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              e.key == "Enter" ? fetchData() : "";
            }}
          />
          <span className="icon" onClick={() => fetchData()}>
            <svg
              width="19px"
              height="19px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  opacity="1"
                  d="M14 5H20"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M14 8H17"
                  stroke="#000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                  stroke="#000"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
                <path
                  opacity="1"
                  d="M22 22L20 20"
                  stroke="#000"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
