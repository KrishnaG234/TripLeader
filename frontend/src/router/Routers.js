import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ThankYou from "../pages/ThankYou";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import SearchResultList from "../pages/SearchResultList";
import Chatbot from "../pages/Chatbot";
import { AuthContext } from "../context/AuthContext";

const Routers = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route
        path="/home"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/tours"
        element={user ? <Tours /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route
        path="/tours/:id"
        element={user ? <TourDetails /> : <Navigate to="/login" />}
      />
      <Route
        path="/tours/search"
        element={user ? <SearchResultList /> : <Navigate to="/login" />}
      />
      <Route
        path="/chatbot"
        element={user ? <Chatbot /> : <Navigate to="/login" />}
      />
      {/* Add a route for the Flights page */}
    </Routes>
  );
};

export default Routers;
