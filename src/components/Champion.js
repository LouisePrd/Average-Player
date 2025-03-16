import React from "react";
import "../styles/champions.css";

export function Champion({ champion }) {
    return (
        <div className="cardChampion">
            <h2>{champion.name}</h2>
            <h3>{champion.title}</h3>
            <img src={champion.img} alt={champion.name} />
        </div>
    );
}
