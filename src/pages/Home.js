import React from "react";
import { Connect } from "../components/Connect";
import "../assets/styles/home.css";

function isConnected() {
  if (localStorage.getItem("pseudo")) {
    return true;
  }
  return false;
}

function getUserName() {
  return localStorage.getItem("pseudo");
}

function disconnect() {
    localStorage.clear();
    window.location.reload();
}

export function Home() {
  return (
    <div className="home">
      <h1>Let's go !</h1>
      <div className="concept">
        <div className="concept-intro">
          {isConnected() ? (
            <div>
            <p>Welcome back {getUserName()} !</p>
            <button id="disconnect" onClick={disconnect}>Disconnect</button>
            </div>
          ) : (
            <div>
              <p>
                You've spent days, months, years playing, watching gameplays,
                learning strategies on League of Legends... (We both know it's
                true)
              </p>
              <p>
                After all this time, do you think you know everything there is
                to know about the game's universe? Test yourself: enter the
                Summoner's Rift and see if you can answer all these questions!
              </p>
              <Connect />
            </div>
          )}
        </div>

        
      </div>
    </div>
  );
}
