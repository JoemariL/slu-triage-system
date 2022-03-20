import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import { Layout } from "./Components/index";
import { Home, Login } from "./Pages/index";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Public. */}
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />

              {/* Unauthorized. */}
              {/* Missing. */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
