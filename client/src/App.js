import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, Link} from "react-router-dom";
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

import RequireAuth from "./context/RequireAuth";
import NoAuth from "./context/NoAuth";


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Login />} />

                <Route element={<NoAuth/>}>
                  <Route exact path="/register" element={<Register />} />
                  <Route exact path="/login" element={<Login />}/>
                </Route>

                <Route element={<RequireAuth/>}>
                  <Route exact path="/home" element={<Home />} />
                  <Route exact path="/web/hdf" element={<WebHDF />} />
                  <Route exact path="/web/hdf/results" element={<PositivePage />} />
                  {/* <Route path="/web/hdf/results" element={<NegativePage />} /> */}
                  <Route exact path="/web/vaccine-profile" element={<WebVaccine />} />
                </Route>  
            </Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
