import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Champions } from "./pages/Champions";
import { Home } from "./pages/Home";
import { Scoreboard } from "./pages/Scoreboard";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Champions />} />
        <Route path="/scores" element={<Scoreboard />} />
      </Routes>
    </Router>
  );
}

export default App;
