import React from "react";
import "../styles/champions.css";
import "../styles/champion-detail.css";

export function Champion({ champion, mode = "card" }) {
  if (!champion) return <div>Champion not found</div>;

  return (
    <div className={mode === "card" ? "card-champion" : "champion-detail"}>
      <h2>{champion.name}</h2>
      <h3>{champion.title}</h3>
      <img src={champion.img} alt={champion.name} />

      {mode === "detail" && (
        <div className="champion-info">
          <p>Title: {champion.title}</p>
        <p>{champion.blurb}</p>
        <p>
          Tags: {champion.tags ? champion.tags.join(", ") : "No tags"}
        </p>
        </div>
      )}
    </div>
  );
}
