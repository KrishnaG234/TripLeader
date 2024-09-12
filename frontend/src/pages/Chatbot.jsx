import React, { useState } from "react";
import SearchBar from "../shared/SearchBar";
import "../styles/chatbot.css";
import loadingImg from "./loading.gif";

const Chatbot = () => {
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const handleContentUpdate = async (content, location) => {
    setLoading(true);
    setLocation(location); // Set the location received from the SearchBar

    // Simulate delay for demonstration purpose
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (content && content.parts && content.parts.length > 0) {
      const text = preprocessContent(content.parts[0].text);
      setGeneratedContent(text);
    } else {
      setGeneratedContent("No content found");
    }

    setLoading(false);
  };

  const preprocessContent = (text) => {
    const boldSections = text.split("**");
    const processedText = boldSections.map((section, index) => {
      if (index % 2 === 1) {
        return <strong key={index}>{section}</strong>;
      } else {
        const lines = section.split(". ");
        return lines.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}.<br />
          </React.Fragment>
        ));
      }
    });
    return processedText;
  };

  return (
    <div className="chatbot">
      <h1 className="delius-swash">Plan your Trip!!!</h1>
      <div className="search-container">
        <SearchBar onContentUpdate={handleContentUpdate} />
      </div>
      <div className="generated-content">
        {loading && (
          <div className="loading">
            <img
              src={loadingImg}
              alt="Loading..."
              style={{ width: "50px", height: "50px" }}
            />
            <p>Your itinerary is loading...</p>
          </div>
        )}
        <h2>Here is your iternary:</h2>
        {!loading && generatedContent}
      </div>

      {/* Embed Google Maps iframe with the location */}
      {location && (
        <iframe
          width="600"
          height="450"
          title="map"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
            location
          )}`}
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Chatbot;
