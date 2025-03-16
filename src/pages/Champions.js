import React from "react";
import { useData } from "../services/Data";
import { Champion } from "../components/Champion";
import "../styles/champions.css";
import { Link } from "react-router";

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
          <Link key={champion.name} to={`/champions/${champion.name}`}>
            <Champion champion={champion} />
          </Link>
        ))}
      </div>
    </div>
  );
}
