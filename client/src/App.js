import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RequireAuth from "./context/RequireAuth";
import VisitorAuth from "./context/VisitorRoute";
import NoAuth from "./context/NoAuth";

// ...
import { Introduction } from "./Pages";

import {
  Login,
  Register,
  Main,
  HealthDeclarationForm,
  Results,
  VaccineProfile,
  ScanQRSuccess,
} from "./Pages/Authenticated";
import {
  RegisterHDF,
  RegisterVaccine,
  UpdateProfile,
  ScanQR,
} from "./Pages/Authenticated/Form";
import { GuestMain, GuestScanQRSuccess } from "./Pages//Guest";
import { RegisterGuest, GuestScanQR } from "./Pages/Guest/Form";

import { Layout } from "./Components/index";

import "./App.css";

function App() {
  // NOTE: Do not Uncomment.
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  return (
    <div className="App ... text-sm md:text-md ...">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<NoAuth />}>
              <Route exact path="/" element={<Introduction />} />
              <Route exact path="/visitor" element={<RegisterGuest />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Route>

            <Route element={<VisitorAuth />}>
              <Route exact path="/visitor/main" element={<GuestMain />} />
              <Route
                exact
                path="/visitor/qr-scanner"
                element={<GuestScanQR />}
              />
              <Route
                exact
                path="/visitor/qr-scanner/success"
                element={<GuestScanQRSuccess />}
              />
            </Route>

            <Route element={<RequireAuth />}>
              <Route exact path="/main" element={<Main />} />
              <Route exact path="/hdf" element={<HealthDeclarationForm />} />
              <Route exact path="/hdf/fillout" element={<RegisterHDF />} />
              <Route exact path="/hdf/result" element={<Results />} />
              <Route exact path="/vaccine" element={<VaccineProfile />} />
              <Route
                exact
                path="/vaccine/manage"
                element={<RegisterVaccine />}
              />
              <Route exact path="/profile/update" element={<UpdateProfile />} />
              <Route exact path="/qr-scanner" element={<ScanQR />} />

              {/* ... */}
              <Route
                exact
                path="/qr-scanner/successful"
                element={<ScanQRSuccess />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
