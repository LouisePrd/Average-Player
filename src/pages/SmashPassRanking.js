import React from "react";
import { getTopSmash, getTopPass } from "../services/UserService";
import { useData } from "../services/DataAPI";
import { LoadingMessage } from "../components/utils/LoadingMessage";
import { ErrorMessage } from "../components/utils/ErrorMessage";
import "../styles/smash-pass.css";

export function SmashPassRanking() {
  const { championByName } = useData();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [topSmash, setTopSmash] = React.useState([]);
  const [topPass, setTopPass] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [topSmashData, topPassData] = await Promise.all([
          getTopSmash(),
          getTopPass(),
        ]);

        if (Array.isArray(topSmashData)) {
          const topSmashWithImages = await Promise.all(
            topSmashData.map(async (champion) => {
              const championData = await championByName(champion.name);
              return { ...champion, img: championData?.img || "" };
            })
          );
          setTopSmash(topSmashWithImages);
        }

        if (Array.isArray(topPassData)) {
          const topPassWithImages = await Promise.all(
            topPassData.map(async (champion) => {
              const championData = await championByName(champion.name);
              return { ...champion, img: championData?.img || "" };
            })
          );
          setTopPass(topPassWithImages);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [championByName]);

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="smash-pass-ranking">
      <h1>Hall of Smash</h1>

      <h2>Top Smashed 💥</h2>
      <ul className="best">
        {topSmash.map((champion, index) => (
          <li key={index}>
            <img src={champion.img} alt={champion.name} />
            {champion.name} -{" "}
            {(
              (champion.smash / (champion.smash + champion.pass)) *
              100
            ).toFixed(2)}
            %
          </li>
        ))}
      </ul>

      <h2>Worst Smashed 🚫</h2>
      <ul className="worst">
        {topPass.map((champion, index) => (
          <li key={index}>
            <img src={champion.img} alt={champion.name} />
            {champion.name} -{" "}
            {((champion.pass / (champion.smash + champion.pass)) * 100).toFixed(
              2
            )}
            %
          </li>
        ))}
      </ul>
    </div>
  );
}
