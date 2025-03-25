import React from "react";
import { Link, useLocation, useNavigate } from "react-router";
import "../styles/navbar.css";

function isConnected() {
  if (localStorage.getItem("pseudo")) {
    return true;
  }
  return false;
}

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value) {
      navigate(`/games/${value}`);
    }
  };

  return (
    <nav>
      <ul className="nav-links">
        <li className={location.pathname === "/champions" ? "active" : ""}>
          <Link to="/champions">Champions</Link>
        </li>
        <li className={location.pathname === "/games" ? "active" : ""}>
          <select onChange={handleSelectChange} defaultValue="">
            <option value="" disabled>
              Smash Or Pass
            </option>
            <option value="smash-or-pass-play">Play</option>
            <option value="smash-or-pass-rank">Top and Flop</option>
          </select>
        </li>
        <li className={location.pathname === "/games/guesser" ? "active" : ""}>
          <Link to="/games/guesser">Guesser</Link>
        </li>
        <li className={location.pathname === "/scoreboard" ? "active" : ""}>
          <Link to="/scores">Scoreboard</Link>
        </li>
        <li className={location.pathname === "/profile" ? "active" : ""}>
          <img id="user" src="/assets/user.png" alt="user" />
          {isConnected() ? (
            <p id="pseudo">{localStorage.getItem("pseudo")}</p>
          ) : (
            ""
          )}
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
