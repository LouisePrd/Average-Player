import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Champions } from "./pages/Champions";
import { Home } from "./pages/Home";
import { Scoreboard } from "./pages/Scoreboard";
import { Games } from "./pages/Games";
import { Guesser } from "./pages/games/Guesser";
import { ChampionDetail } from "./pages/ChampionDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/scores" element={<Scoreboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/guesser" element={<Guesser />} />
        <Route path="/champions/:name" element={<ChampionDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
