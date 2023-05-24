import React, { useState } from "react";
import axios from "axios";

const apiKey = "c8b2b10fc206530e62bc531e91cc1001";
const Home = () => {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input) {
      setError("Please enter a city name!");
      return;
    }

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`
      )
      .then((response) => {
        const { main, name, sys, weather } = response.data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        const newCity = {
          name,
          country: sys.country,
          temp: Math.round(main.temp),
          feels_like: Math.round(main.feels_like),
          temp_max: Math.round(main.temp_max),
          temp_min: Math.round(main.temp_min),
          description: weather[0]["description"],
          icon,
        };

        const cityExists = cities.some((city) => city.name === newCity.name);

        if (cityExists) {
          setError(`${newCity.name} is already added 😉`);
          return;
        }

        setCities((prevCities) => [...prevCities, newCity]);
        setInput("");
        setError("");
      })
      .catch(() => {
        setError("Type a valid city name!");
      });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <div className="container mx-auto h-screen w-screen overflow-x-hidden">
        <form onSubmit={handleSubmit} className="mt-10">
          <div className="flex flex-col items-center gap-1 md:flex md:flex-row md:justify-center mb-2">
            <input
              className="bg-gray-100 border-none outline-none border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Search for a city 🌎"
              value={input}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2"
            >
              <svg
                className="h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 56.966 56.966"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-black flex text-center mr-20">{error}</span>
          </div>
        </form>

        <div className="grid  justify-center  m-5 gap-3 md:flex md:items-center md:justify-center md:flex-row md:flex-wrap md:gap-3">
          {cities.length > 0 &&
            cities.map((city) => (
              <div className="bg-white shadow-2xl p-6 rounded-2xl border-2 border-gray-50 ">
                <div className="flex flex-col ">
                  <div>
                    <h2 className="font-bold text-gray-600 text-center">
                      {city.name}
                    </h2>
                  </div>
                  <div className="my-6">
                    <div className="flex flex-row space-x-4 items-center">
                      <div id="icon">
                        <span>
                          <img
                            src={city.icon}
                            alt={city.description}
                            className="w-20 pt-2"
                          />
                        </span>
                      </div>
                      <div id="temp">
                        <h4 className="text-4xl">{city.temp}°C</h4>
                        <p className="text-xs text-gray-500">
                          Feels like {city.feels_like}°C
                        </p>
                        <p className="text-xs text-gray-500 my-2">
                          max temperature {city.temp_max}°C
                        </p>
                        <p className="text-xs text-gray-500">
                          Feels like {city.temp_min}°C
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full place-items-end text-center border-t-2 border-gray-100 mt-2">
                    <p className="text-xs text-gray-500">{city.description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
