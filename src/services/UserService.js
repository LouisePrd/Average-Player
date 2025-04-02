import { createClient } from "@supabase/supabase-js";

// Récupération des variables d'environnement .env (sécurité)
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Requête BDD Supabase pour ajouter une partie d'un utilisateur
// Page Game Guesser
export const saveGameResult = async (pseudo, difficulty, score, typeGame) => {
  if (!pseudo || !difficulty || !score || !typeGame) {
    console.error("Missing parameters");
    return null;
  }
  const { data, error } = await supabase.from("games").insert([
    {
      pseudo,
      difficulty,
      score,
      type_game: typeGame,
    },
  ]);

  if (error) return null;

  return data;
};

// Requête BDD Supabase pour récupérer les 5 dernières parties faciles
// Page Scoreboard
export const getFiveLastEasyGames = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("difficulty", "easy")
    .order("played_at", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data || [];
};

// Requête BDD Supabase pour récupérer les 5 dernières parties difficiles
// Page Scoreboard
export const getFiveLastHardGames = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("difficulty", "hard")
    .order("played_at", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data || [];
};

// Requête BDD Supabase pour récupérer les 5 meilleurs joueurs
// Page Scoreboard
export const getTopPlayers = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("score", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data || [];
};

// Requête BDD Supabase pour récupérer un champion par son nom
// Page Detail Champion
export const championByName = async (name) => {
  const { data, error } = await supabase
    .from("champions")
    .select("*")
    .eq("name", name)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// Requête BDD Supabase pour récupérer les 5 champions les plus smashés
// Page SmashOrPass
export const getTopSmash = async () => {
  const { data, error } = await supabase
    .from("champions")
    .select("*")
    .gt("smash", 2)
    .order("smash", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data || [];
};

// Requête BDD Supabase pour récupérer les 5 champions les plus passés si + de 3 votes
// Page SmashOrPass
export const getTopPass = async () => {
  const { data, error } = await supabase
    .from("champions")
    .select("*")
    .gt("pass", 2)
    .order("pass", { ascending: false })
    .limit(5);

  if (error) throw new Error(error.message);

  return data || [];
};

// Requête BDD Supabase pour update le nombre de smash ou pass d'un champion
// Page SmashOrPass
export const insertChampionByName = async (champion, type) => {
  if (!champion?.name) throw new Error("Missing champion name");

  // Vérifier si le champion existe
  const { data: existingChampion, error: fetchError } = await supabase
    .from("champions")
    .select("smash, pass")
    .eq("name", champion.name)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);

  let updatedStats;

  // Si le champion existe, on update les stats
  if (existingChampion) {
    const updateField =
      type === "Smash"
        ? { smash: existingChampion.smash + 1 }
        : { pass: existingChampion.pass + 1 };

    const { data, error } = await supabase
      .from("champions")
      .update(updateField)
      .eq("name", champion.name)
      .select();

    if (error) throw new Error(error.message);
    updatedStats = data[0];
  } else {
    // Sinon on le crée
    const newChampion = {
      name: champion.name,
      smash: type === "Smash" ? 1 : 0,
      pass: type === "Pass" ? 1 : 0,
    };

    const { data, error } = await supabase
      .from("champions")
      .insert([newChampion])
      .select(); // 🔹 Récupère les valeurs insérées

    if (error) throw new Error(error.message);
    updatedStats = data[0];
  }

  return updatedStats;
};
