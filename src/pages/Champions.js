import React from "react";
import { useData } from "../services/Data";
import { Champion } from "../components/Champion";
import "../assets/styles/champions.css";

export function Champions() {
  const { allChampions, loading, error } = useData();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="champions">
      <h1>All Champions</h1>
      <div className="allChampions">
        {allChampions.map((champion) => (
          <Champion key={champion.name} champion={champion} />
        ))}
      </div>
    </div>
  );
}
