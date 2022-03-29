import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Authentication, Home, HDF, VaccineProfile, Results } from "./Pages";
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
              <Route path="/" element={<Authentication />} />
              <Route exact path="/login" element={<Authentication />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route exact path="/home" element={<Home />} />
              <Route exact path="/hdf" element={<HDF />} />
              <Route
                exact
                path="/vaccine_profile"
                element={<VaccineProfile />}
              />
              <Route exact path="/entry_result" element={<Results />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
