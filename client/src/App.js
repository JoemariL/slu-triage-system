import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Login, WebHDF, Register } from "./Pages/index";
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
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
