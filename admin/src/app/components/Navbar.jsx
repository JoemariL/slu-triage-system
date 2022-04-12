import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FAIcons from "react-icons/fa";
import * as AIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
// import { Link } from "react-router-dom";
// import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../../css/sidenav.css";
// import React from "react";
import { IconContext } from "react-icons";

{
  /* <header className="header">
        <div className="logo"> */
}
{
  /* <Link to="/Dashboard">Admin Dashboard</Link> */
}
{
  /* </div>
      </header>{" "}
      <div class="sidenav">
        <h1>
          <a href="/dashboard">Admin Dashboard</a>
        </h1>
        <a href="/generateQR">QR </a>
        <a href="/users">Users</a>
        <a href="/" class="logout">
          Logout
        </a>
      </div> */
}

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="navbar" value={{ color: "#fff" }}>
        <Link to="#" className="menu-bars">
          <FAIcons.FaBars onClick={showSidebar} />
        </Link>
        {/* <h1>ADMIN DASHBOARD</h1> */}
        <Link to="/dashboard" className="">
          <h1>Admin Dashboard</h1>
        </Link>
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AIcons.AiOutlineClose />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.className}>
                <Link to={item.path}>
                  {/* {item.icon} */}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
