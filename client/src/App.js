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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<NoAuth />}>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Register />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route exact path="/main" element={<Main />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
