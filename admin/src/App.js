import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequireAuth from "./context/RequireAuth";
import NoAuth from "./context/NoAuth";

import { Navbar } from "./Components/app_ui/Navbar";

import {
  Login,
  Main,
  MainOverview,
  Reports,
  TriageQR,
  TriageTeam,
  TriageUsers,
  ReportsArchived,
} from "./Pages";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route element={<NoAuth />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route element={<Navbar />}>
              <Route path="/main" element={<Main />} />
              <Route
                path="/main/campus/gate/overview"
                element={<MainOverview />}
              />
              <Route path="/triageapp-qrcodes" element={<TriageQR />} />
              <Route path="/triageapp-users" element={<TriageUsers />} />
              <Route
                path="/triageapp-administrators"
                element={<TriageTeam />}
              />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/archived" element={<ReportsArchived />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
