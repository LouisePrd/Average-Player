import React from "react";
import "../styles/scoreboard.css";

export function Scoreboard() {
    let pseudo = localStorage.getItem("pseudo");
    let totalAttempts = parseInt(localStorage.getItem("totalAttempts") || 0);

    return (
        <div className="scoreboard">
        <h1>Scoreboard</h1>
        {pseudo ? (
        <div className="score">
            <p>Pseudo: {pseudo}</p>
            <p>Total attempts: {totalAttempts}</p>
        </div>    
        ) : (
        <div className="no-data">
            <p>No data available<br></br>Play a game to see your score</p>
            <button onClick={() => (window.location = "/")}>Home</button>
                </div>
            )}
        </div>
    );
    }
