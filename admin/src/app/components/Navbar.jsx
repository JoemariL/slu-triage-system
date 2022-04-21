import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import * as FAIcons from "react-icons/fa";
import * as AIcons from "react-icons/ai";
import { NavbarData } from "./NavbarData";
// import { Link } from "react-router-dom";
// import { Button, Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "../../css/navbar.css";
// import React from "react";
import { IconContext } from "react-icons";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="navbar" value={{ color: "#fff" }}>
        <Link to="/dashboard" className="">
          <h1>Admin Dashboard</h1>
        </Link>
        {NavbarData.map((item, index) => {
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
                {/* {item.icon} */}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </div>

      <Outlet />
    </>
  );
}

export default Navbar;
