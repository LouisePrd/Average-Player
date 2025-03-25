import { useState, useEffect } from "react";

// Fonction pour mettre la première lettre en majuscule
function strUcFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Récupération données de l'API : champion aléatoire
// Page Guesser
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

// Récupération données de l'API : tous les champions
// Page Champions
function getAllChampions(champions) {
  if (!champions || !champions.length) {
    return null;
  }
  return champions.map((champion) => ({
    name: champion.name,
    title: strUcFirst(champion.title),
    img: `https://ddragon.leagueoflegends.com/cdn/15.4.1/img/champion/${champion.image.full}`,
    blurb : champion.blurb,
    tags: champion.tags
  }));
}

// Récupération données de l'API : champion par nom
// Page Detail Champion
async function getChampionByName(champions, name) {
  try {
    const champion = champions.find(champ => champ.name.toLowerCase() === name.toLowerCase());
    if (!champion) {
      return null;
    }

    return {
      name: champion.name,
      title: strUcFirst(champion.title),
      img: `https://ddragon.leagueoflegends.com/cdn/15.4.1/img/champion/${champion.image.full}`,
      blurb: champion.blurb,
      tags: champion.tags || []
    };
  } catch (error) {
    return null;
  }
}

// Hook pour les données de l'API
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

  // Retourne les fonctions de récupération des données
  return { 
    randomChampion: champions.length > 0 ? getRandomChampion(champions) : null,
    allChampions: champions.length > 0 ? getAllChampions(champions) : [],
    championByName: (name) => champions.length > 0 ? getChampionByName(champions, name) : null,
    error, 
    loading 
  };
};