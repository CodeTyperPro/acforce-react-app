import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Container from "./components/Container/Container";

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
