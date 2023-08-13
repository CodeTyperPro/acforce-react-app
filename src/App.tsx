import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Preferences from "./pages/Preferences/Preferences";
import Notifications from "./pages/Notifications/Notifications";
import NoPage from "./pages/NoPage";
import SideBar from "./components/SideBar/SideBar";
import Container from "./components/Container/Container";
import { AudioPlayerContext } from "./components/Audio/AudioPlayerContext";
import { useEffect, useState } from "react";

function App() {
  return (
    <BrowserRouter>
        <Navbar />
        <div className="app-menu-container">
          <SideBar />
          <Container />
        </div>
    </BrowserRouter>
  );
}

export default App;
