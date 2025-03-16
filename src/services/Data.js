import { useState, useEffect } from "react";


function getRandomChampion(champions) {
  if (!champions || !champions.length) {
    return null;
  }
  let urlImg = "https://ddragon.leagueoflegends.com/cdn/15.4.1/img/champion/";
  const randomIndex = Math.floor(Math.random() * champions.length);
  urlImg += champions[randomIndex].image.full;
  return {
    name: champions[randomIndex].name,
    title: champions[randomIndex].title,
    img: urlImg
  };
}

function strUcFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getAllChampions(champions) {
  if (!champions || !champions.length) {
    return null;
  }
  return champions.map((champion) => ({
    name: champion.name,
    title: strUcFirst(champion.title),
    img: `https://ddragon.leagueoflegends.com/cdn/15.4.1/img/champion/${champion.image.full}`,
    blurb : champion.blurb,
    tags: champion.tags.join(", ")
  }));
}

export const useData = () => {
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ddragon.leagueoflegends.com/cdn/15.4.1/data/en_US/champion.json');
        const json = await response.json();
        setChampions(Object.values(json.data || {}));
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { 
    randomChampion: champions.length > 0 ? getRandomChampion(champions) : null,
    allChampions: champions.length > 0 ? getAllChampions(champions) : [],
    error, 
    loading 
  };
};