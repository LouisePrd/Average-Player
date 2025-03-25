import React from "react";
import { useParams } from "react-router";
import { useData } from "../services/DataAPI";
import { Champion } from "../components/Champion";
import { LoadingMessage } from "../components/utils/LoadingMessage";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import "../styles/champion-detail.css";

export function ChampionDetail() {
  const { name } = useParams();
  const { allChampions, loading, error } = useData();

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error.message} />;

  const champion = allChampions.find((champ) => champ.name === name);

  if (!champion) return <div>Champion not found</div>;

  return (
    <div>
      <Champion champion={champion} mode="detail" />
    </div>
  );
}
