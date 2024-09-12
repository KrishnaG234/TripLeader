import React, { useRef } from "react";
import "./search-bar.css";
import { Col, Form, FormGroup } from "reactstrap";

const SearchBar = ({ onContentUpdate }) => {
  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All fields are required");
    }

    // Construct the prompt for the chatbot
    const prompt = `Give a complete travel itinerary for a trip to ${location} for ${maxGroupSize} people within ${distance} INR`;

    // Call function to interact with the Gemini API
    await interactWithGeminiAPI(prompt);
  };

  const interactWithGeminiAPI = async (prompt) => {
    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBzNeb8lkBD8wEyToohYnkj65Jze_bXasE",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data from Gemini API");
      }

      const result = await response.json();
      // Pass the API response to the parent component
      onContentUpdate(result.candidates[0].content);
    } catch (error) {
      console.error("Error interacting with Gemini API:", error);
    }
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 from form__group form__group-fast ">
            <span>
              <i className="ri-map-pin-line"></i>
            </span>
            <div>
              <h6>Location</h6>
              <input
                type="text"
                placeholder="Where are you going?"
                ref={locationRef}
              />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 from form__group form__group-fast ">
            <span>
              <i className="ri-map-pin-time-line"></i>
            </span>
            <div>
              <h6>Price</h6>
              <input type="text" placeholder="Price in INR" ref={distanceRef} />
            </div>
          </FormGroup>
          <FormGroup className="d-flex gap-3 from form__group form__group-fast ">
            <span>
              <i className="ri-group-line"></i>
            </span>
            <div>
              <h6>Max People</h6>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>

          <span className="search__icon" type="submit" onClick={searchHandler}>
            <i className="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
