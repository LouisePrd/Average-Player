import React from "react";
import { Link, useLocation } from "react-router";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";

export function Navbar() {
  const location = useLocation();

  return (
    <nav>
      <ul>
        <li className={location.pathname === "/" ? "active" : ""}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === "/champions" ? "active" : ""}>
          <Link to="/champions">Champions</Link>
        </li>
        <li className={location.pathname === "/game" ? "active" : ""}>
          <Link to="/game">Games</Link>
        </li>
        <li className={location.pathname === "/scoreboard" ? "active" : ""}>
          <Link to="/scoreboard">Scoreboard</Link>
        </li>
      </ul>
      <img id="logo" src={logo} alt="logo" onClick={() => (window.location = "/")} />
    </nav>
  );
}
