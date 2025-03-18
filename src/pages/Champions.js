import React, { useState } from "react";
import { useData } from "../services/Data";
import { Champion } from "../components/Champion";
import "../styles/champions.css";
import { Link } from "react-router";

export function Champions() {
  const { allChampions, loading, error } = useData();
  const [selectedTag, setSelectedTag] = useState("All");

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

  return (
    <div className="champions">
      <h1>All Champions</h1>

      <div className="filter">
        <label htmlFor="tag-filter">Filter by Tag : </label>
        <select
          id="tag-filter"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

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
