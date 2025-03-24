import "../styles/games.css";

export function Games() {
  return (
    <div className="games">
      <h1>Games</h1>
      <p>2 different games, 2 different outcomes.</p>

      <div className="guesser">
        <h2>Guess the Champion</h2>
        <p>Can you guess the champion by their abilities?<br></br>Try it out!

        </p>
        <button
          id="btn-games"
          onClick={() => (window.location.href = "/games/guesser")}
        >
          Play
        </button>
      </div>

      <div className="smash-or-pass">
        <h2>Smash or pass</h2>
        <p>
          Would you smash or pass this champion?<br></br>(Please not minors)
        </p>
        <button id="btn-games"
        onClick={() => (window.location.href = "/games/smash-or-pass")}
        >Play</button>
      </div>
    </div>
  );
}
