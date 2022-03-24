import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Home,
  Login,
  WebHDF,
  WebVaccine,
  Register,
  PositivePage,
  NegativePage,
} from "./Pages/index";
import { Layout } from "./Components/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/web/hdf" element={<WebHDF />} />
            {/* <Route path="/web/hdf/results" element={<PositivePage />} /> */}
            <Route path="/web/hdf/results" element={<NegativePage />} />
            <Route path="/web/vaccine-profile" element={<WebVaccine />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
