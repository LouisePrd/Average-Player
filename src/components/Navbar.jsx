import React from "react";
import { Link, useLocation } from "react-router";
import "../styles/navbar.css";

function isConnected() {
  if (localStorage.getItem("pseudo")) {
    return true;
  }
  return false;
}


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
        <li className={location.pathname === "/games" ? "active" : ""}>
          <Link to="/games">Games</Link>
        </li>
        <li className={location.pathname === "/scoreboard" ? "active" : ""}>
          <Link to="/scores">Scoreboard</Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <Link to="/profile">
            <img id="user" src="/assets/user.png" alt="user" />
          </Link>
          {isConnected() ? (
            <p id="pseudo">{localStorage.getItem("pseudo")}</p>
          ) : (
            ""
          )
            
          }
        </li>
      </ul>
      <div className="logos">
      <img
        id="logo"
        src="/assets/logo.png"
        alt="logo"
        onClick={() => (window.location = "/")}
      />
      <p>AveragePlayer.gg</p>
      </div>
    </nav>
  );
}
