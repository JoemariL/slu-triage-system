import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login, Home, HDF, VaccineProfile } from "./Pages/mobile";
import { RegistrationForm } from "./Components/presets/mobile";
import { Layout } from "./Components/index";
import RequireAuth from "./context/RequireAuth";
import NoAuth from "./context/NoAuth";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<NoAuth />}>
              <Route path="/" element={<Login />} />
              <Route exact path="/login" element={<Login />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/hdf" element={<HDF />} />
              <Route exact path="/vaccine" element={<VaccineProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
