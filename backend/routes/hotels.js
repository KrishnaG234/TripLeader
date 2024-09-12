import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/search", async (req, res) => {
  const { query } = req.query;

  try {
    const response = await axios.get(
      "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination",
      {
        params: {
          text: query,
        },
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
          "X-RapidAPI-Key":
            "c02a254091mshc3cc59b3f13086ap1d42e2jsnbec0430ec97b",
        },
      }
    );

    res.json({ hotels: response.data });
  } catch (error) {
    console.error("Error fetching hotels:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Error response:", error.response.data);
      console.error("Status code:", error.response.status);
      res.status(error.response.status).json(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      res.status(500).json({ error: "No response received from server" });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
      res.status(500).json({ error: "Error setting up request" });
    }
  }
});

export default router;
