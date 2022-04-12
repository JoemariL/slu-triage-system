import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom";
import NavyBase from "./pages/generateQR";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./app/components/Navbar";
import RequireAuth from "./context/RequireAuth";
import NoAuth from "./context/NoAuth";
import Admin from "./pages/Admin";
import "./css/App.css";

function App() {
  return (
    <>
      {/* <Header /> */}
      {/* <Sidenav /> */}

      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>

      {/* <div className="container"> */}
      <div className="">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/generateQR" element={<NavyBase />} />
            <Route path="/users" element={<Users />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
