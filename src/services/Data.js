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
    img: urlImg,
  };
}


export const useData = () => {
  const [datas, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = 'https://ddragon.leagueoflegends.com/cdn/15.4.1/data/en_US/champion.json';
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: { accept: "application/json" },
        });
        const json = await response.json();
        setData(Object.values(json.data || {})); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const data = datas.length > 0 ? getRandomChampion(datas) : null;

  return { data, error, loading };
};
