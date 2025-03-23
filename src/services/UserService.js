
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


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

  if (error) {
    console.error(error.message);
    return null;
  }

  return data;
};

export const getUser = async (pseudo) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("pseudo", pseudo)
    .single();

  if (error)
    throw new Error(error.message);

  return data;
}

export const getFiveLastEasyGames = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("difficulty", "easy")
    .order("played_at", { ascending: false })
    .limit(5);

  if (error)
    throw new Error(error.message);

  return data || [];
}

export const getFiveLastHardGames = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .eq("difficulty", "hard")
    .order("played_at", { ascending: false })
    .limit(5);

  if (error)
    throw new Error(error.message);

  return data || [];
}

export const getTopPlayers = async () => {
  const { data, error } = await supabase
    .from("games")
    .select("*")
    .order("score", { ascending: false })
    .limit(5);

  if (error)
    throw new Error(error.message);

  return data || [];
}