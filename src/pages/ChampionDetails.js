import React from "react";
import { useParams } from "react-router";
import { useData } from "../services/Data";
import "../styles/champion-detail.css";

export function ChampionDetail() {
  const { name } = useParams();
  const { allChampions } = useData();

  const champion = allChampions.find((champ) => champ.name === name);

  if (!champion) {
    return <div>Champion not found</div>;
  }

  return (
    <div className="champion-detail">
      <p>{champion.name}</p>
      <img src={champion.img} alt={champion.name} />
      <div className="champion-info">
        <p>Title : {champion.title}</p>
        <p>{champion.blurb}</p>
        <p>Tags : {champion.tags}</p>
      </div>
    </div>
  );
}
