import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "./components/Navbar";
import { Champions } from "./pages/Champions";
import { Home } from "./pages/Home";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <h1>Average player</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/champions" element={<Champions />} />
      </Routes>
    </Router>
  );
}

export default App;
