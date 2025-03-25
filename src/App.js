import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Champions } from "./pages/Champions";
import { Home } from "./pages/Home";
import { Scoreboard } from "./pages/Scoreboard";
import { Games } from "./pages/Games";
import { Guesser } from "./pages/Guesser";
import { SmashOrPass } from "./pages/SmashOrPass";
import { ChampionDetail } from "./pages/ChampionDetails";
import { SmashPassRanking } from "./pages/SmashPassRanking";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/scores" element={<Scoreboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/guesser" element={<Guesser />} />
        <Route path="/games/smash-or-pass-play" element={<SmashOrPass />} />
        <Route path="/games/smash-or-pass-rank" element={<SmashPassRanking />} />
        <Route path="/champions/:name" element={<ChampionDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
