import React, { useState, useEffect } from "react";
import axios from "axios"; // Assuming you'll use Axios for fetching data
import parse from "html-react-parser"; // Library for parsing HTML content

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://www.incredibleindia.org/content/incredible-india-v2/en.html"
        );
        const htmlContent = response.data; // Assuming the response contains HTML content
        const parsedData = parse(htmlContent); // Parse HTML content to extract information
        setPlaces(parsedData); // Set the parsed data as places
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="explore-page">
      <h1>Explore</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="places-list">
        {places.map((place, index) => (
          <div key={index} className="place">
            {place}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
