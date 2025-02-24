import React from "react";
import "../assets/styles/navbar.css";
import logo from "../assets/images/logo.png";

export function Navbar({ activeItem }) {
  return (
    <nav>
      <ul>
        <li className={activeItem === "home" ? "active" : ""}>
          <a href="/">Home</a>
        </li>
        <li className={activeItem === "champion" ? "active" : ""}>
          <a href="/champion">Champion</a>
        </li>
        <li className={activeItem === "concept" ? "active" : ""}>
          <a href="/concept">Concept</a>
        </li>
        <li className={activeItem === "scoreboard" ? "active" : ""}>
          <a href="/scoreboard">Scoreboard</a>
        </li>
      </ul>
      <img id="logo" src={logo} alt="logo" />
    </nav>
  );
}
