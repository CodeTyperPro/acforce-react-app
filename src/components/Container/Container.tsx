import React from "react";
import Navbar from "../Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Preferences from "../../pages/Preferences/Preferences";
import Notifications from "../../pages/Notifications/Notifications";
import NoPage from "../../pages/NoPage";

function Container() {
  return (
    <>
      <div className="container">
        <Routes>
          <Route index element={<Notifications />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="preferences" element={<Preferences />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </div>
    </>
  );
}

export default Container;
