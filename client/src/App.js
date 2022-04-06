import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./context/RequireAuth";
import VisitorAuth from "./context/VisitorRoute";
import NoAuth from "./context/NoAuth";
import { Layout } from "./Components/index";
import "./App.css";
import { Login, Main, Register } from "./Pages/Authorized";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Main /> */}
      <Register />
    </div>
  );
}

export default App;
