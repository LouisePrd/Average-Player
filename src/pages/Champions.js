import React, { useState } from "react";
import { useData } from "../services/Data";
import { Champion } from "../components/Champion";
import { Filter } from "../components/Filter";
import "../styles/champions.css";
import { Link } from "react-router";

export function Champions() {
  const { allChampions, loading, error } = useData();
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
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

      <div className="allChampions">
        {filteredChampions.map((champion) => (
          <Link key={champion.name} to={`/champions/${champion.name}`}>
            <Champion champion={champion} />
          </Link>
        ))}
      </div>
    </div>
  );
}
