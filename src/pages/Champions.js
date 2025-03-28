import React, { useState } from "react";
import { useData } from "../services/DataAPI";
import { Champion } from "../components/Champion";
import { Filter } from "../components/Filter";
import { LoadingMessage } from "../components/utils/LoadingMessage";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import "../styles/champions.css";
import { Link } from "react-router";

export function Champions() {
  const { allChampions, loading, error } = useData();
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) {
    return <LoadingMessage />;
  }
  if (error) {
    return <ErrorMessage error={error} />;
  }

  const tags = ["All", ...new Set(allChampions.flatMap((champ) => champ.tags))];

  const filteredChampions =
    selectedTag === "All"
      ? allChampions
      : allChampions.filter((champ) => champ.tags.includes(selectedTag));

      
  if (sortOrder === "asc") {
    filteredChampions.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    filteredChampions.sort((a, b) => b.name.localeCompare(a.name));
  }

  return (
    <div className="champions">
      <h1>All Champions</h1>

     <Filter
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        tags={tags}
      />

      <div className="all-champions">
        {filteredChampions.map((champion) => (
          <Link key={champion.name} to={`/champions/${champion.name}`}>
            <Champion champion={champion} mode="card" />
          </Link>
        ))}
      </div>
    </div>
  );
}
