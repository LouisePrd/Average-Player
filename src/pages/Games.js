import "../styles/games.css";

export function Games() {
  return (
    <div className="games">
      <h1>Games</h1>
      <p>3 different games, 3 different champions, 3 different outcomes.</p>

      <div className="guesser">
        <h2>Guess the Champion with LeBlanc !</h2>
        <p>Can you guess the champion by their abilities?</p>
        <button id="btn-games" onClick={() =>  window.location.href = "/games/guesser"}>Play</button>
      </div>

      <div className="memory">
        <h2>Memory Game with Ekko !</h2>
        <p>Match the champions to win!</p>
        <button id="btn-games">Play</button>
      </div>
      


    </div>
  );
}
