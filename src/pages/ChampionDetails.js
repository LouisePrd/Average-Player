import React from "react";
import { useParams } from "react-router";
import { useData } from "../services/DataAPI";
import "../styles/champion-detail.css";

export function ChampionDetail() {
  const { name } = useParams();
  const { allChampions, loading, error } = useData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const champion = allChampions.find((champ) => champ.name === name);

  if (!champion) return <div>Champion not found</div>;

  return (
    <div className="champion-detail">
      <h1>{champion.name}</h1>
      <img src={champion.img} alt={champion.name} />
      <div className="champion-info">
        <p>Title: {champion.title}</p>
        <p>{champion.blurb}</p>
        <p>
          Tags: {champion.tags ? champion.tags.join(", ") : "No tags available"}
        </p>
      </div>
    </div>
  );
}
