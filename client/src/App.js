import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import {
  Login,
  Registration,
  Home,
  HDFView,
  VaccineView,
  Result,
} from "./Pages/mobile";
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
              <Route path="/" element={<Login />}/> 
              <Route
                exact
                path="/web/registration"
                element={<Registration />}
              />
              <Route exact path="/login" element={<Login />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/web/hdf" element={<HDFView />} />
                <Route exact path="/profile/vaccine" element={<VaccineView />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
