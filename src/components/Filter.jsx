import React from "react";

// Filtres par tag et ordre alphabétique
export function Filter({ selectedTag, setSelectedTag, sortOrder, setSortOrder, tags }) {
  return (
    <div className="filters">
      <label htmlFor="tag-filter">Filter by tag: </label>
      <select id="tag-filter" value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)}>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <label htmlFor="sort-name">Sort by name: </label>
      <select id="sort-name" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
        <option value="asc">A - Z</option>
        <option value="desc">Z - A</option>
      </select>
    </div>
  );
}
