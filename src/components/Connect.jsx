import { useState } from "react";

// Composant pour se connecter avec localStorage
export function Connect() {
  const [pseudo, setPseudo] = useState("");
  const [loading, setLoading] = useState(false);

  const connected = async () => {
    const trimmedPseudo = pseudo.trim();
    if (!trimmedPseudo) {
      alert("Invalid pseudo");
      return;
    }
    setLoading(true);
    try {
      localStorage.setItem("pseudo", trimmedPseudo);
      window.location = "/";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <p>But first, what's your pseudo?</p>
      <input 
        type="text" 
        placeholder="Enter your pseudo" 
        value={pseudo} 
        onChange={(e) => setPseudo(e.target.value)} 
        disabled={loading}
      />
      <button onClick={connected} disabled={loading}>
        {loading ? "Loading..." : "Start"}
      </button>
    </div>
  );
}
