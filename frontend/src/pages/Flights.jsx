import React, { useState } from "react";
import axios from "axios";

const Flights = () => {
  const [searchParams, setSearchParams] = useState({
    originSkyId: "",
    destinationSkyId: "",
    date: "",
    adults: "1",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
    originEntityId: "",
    destinationEntityId: "",
  });
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const options = {
      method: "GET",
      url: "https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights",
      params: {
        ...searchParams,
      },
      headers: {
        "X-RapidAPI-Key": "c02a254091mshc3cc59b3f13086ap1d42e2jsnbec0430ec97b",
        "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setFlights(response.data.flights || []); // Ensure flights data is an array
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flights-container">
      <h2>Flight Search</h2>
      <form onSubmit={handleSubmit} className="flight-form">
        <div className="input-group">
          <label>Origin Sky ID:</label>
          <input
            type="text"
            name="originSkyId"
            value={searchParams.originSkyId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Destination Sky ID:</label>
          <input
            type="text"
            name="destinationSkyId"
            value={searchParams.destinationSkyId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={searchParams.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Number of Adults:</label>
          <input
            type="number"
            name="adults"
            value={searchParams.adults}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div className="input-group">
          <label>Currency:</label>
          <input
            type="text"
            name="currency"
            value={searchParams.currency}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Market:</label>
          <input
            type="text"
            name="market"
            value={searchParams.market}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Country Code:</label>
          <input
            type="text"
            name="countryCode"
            value={searchParams.countryCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Origin Entity ID:</label>
          <input
            type="text"
            name="originEntityId"
            value={searchParams.originEntityId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Destination Entity ID:</label>
          <input
            type="text"
            name="destinationEntityId"
            value={searchParams.destinationEntityId}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Searching..." : "Search Flights"}
        </button>
      </form>

      {error && <div className="error-msg">Error: {error}</div>}

      <h2>Available Flights</h2>
      <ul>
        {flights.map((flight, index) => (
          <li key={index}>
            {/* Render flight information here */}
            Flight {index + 1}: {flight.name}, {flight.price}, etc.
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flights;
